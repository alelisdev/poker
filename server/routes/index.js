const configureRoutes = (app) => {
  app.use("/api/auth", require("./api/auth"));
  app.use("/api/users", require("./api/users"));
  app.use("/api/mails", require("./api/mails"));
  app.use("/api/chips", require("./api/chips"));
  app.use("/api/tatum", require("./api/tatum"));
  app.use("/api/payments", require("./api/payments"));
  app.use("/api/tournaments", require("./api/tournaments"));
  app.use("/", (req, res) => {
    res.status(200).send("Welcome to Poker!");
  });
};

module.exports = configureRoutes;
