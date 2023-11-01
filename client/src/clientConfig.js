const config = {
  isProduction: process.env.NODE_ENV === "production",
  socketURI:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_SERVER_URI
      : `http://${window.location.hostname}:5000/`,
};

export default config;
