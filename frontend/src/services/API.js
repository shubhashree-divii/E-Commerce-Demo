import axios from "axios";

//UnAuthorized API
const UAPI = axios.create({
  baseURL: "http://localhost:3001",
});

//Authorized API
const AAPI = axios.create({
  baseURL: "http://localhost:3001",
});

// Add a request interceptor
AAPI.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = "Bearer " + token;
  return config;
});
export { UAPI, AAPI };
