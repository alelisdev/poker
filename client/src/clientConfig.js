const config = {
  isProduction: process.env.NODE_ENV === "production",
  socketURI: "http://localhost:8080", //process.env.REACT_APP_SERVER_URI,
};

export default config;
