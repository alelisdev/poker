import Axios from "axios";

const API_HOST = 'http://185.190.140.99:5000' //process.env.REACT_APP_SERVER_URI;

const pokerClient = Axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 100000,
});

pokerClient.interceptors.request.use((request) => {
  if (request.headers) request.headers["x-auth-token"] = localStorage.token;
  return request;
});

export default pokerClient;
