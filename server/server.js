const path = require("path");
const express = require("express");
const cors = require("cors");
const config = require("./config");
const connectDB = require("./config/db");
const configureMiddleware = require("./middleware");
const configureRoutes = require("./routes");
const socketio = require("socket.io");
const cron = require("node-cron");
const gameSocket = require("./socket/index");
const { initTatumETH, initTatumSOL } = require("./helpers/initTatum");
const UserModel = require("./models/User");

// Connect and get reference to mongodb instance
let db;

(async function () {
  db = await connectDB();
})();

// Init express app
const app = express();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(cors({ origin: "*" }));
// Enable pre-flight
app.options("*", cors());

// Config Express-Middleware
configureMiddleware(app);

// Set-up static asset path
app.use(express.static(path.join("server", "public")));

// Set-up Routes
configureRoutes(app);

initTatumETH();
initTatumSOL();

cron.schedule("0 23 * * 0", () => {
  UserModel.updateMany(
    {},
    {
      $set: {
        tournaments: [],
      },
    },
    (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${res.modifiedCount} documents updated successfully.`);
      }
    }
  );
});

// Start server and listen for connections
const server = app.listen(config.PORT, () => {
  console.log(
    `Server is running in ${config.NODE_ENV} mode and is listening on port ${config.PORT}...`
  );
});

//  Handle real-time poker game logic with socket.io
const io = socketio(server);

io.on("connection", (socket) => gameSocket.init(socket, io));

// Error handling - close server
process.on("unhandledRejection", (err) => {
  db.disconnect();

  console.error(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
