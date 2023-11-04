const config = {
  isProduction: process.env.NODE_ENV === "production",
  socketURI: process.env.REACT_APP_SERVER_URI,
};

export default config;
