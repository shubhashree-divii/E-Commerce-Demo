import axios from "axios";
import { globalRouter } from "../router/globalRouter";

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

// Add a response interceptor
// AAPI.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   console.log(response.status)
//   return response;
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error);
// });

AAPI.interceptors.response.use(
  (response) => {
    console.log(response)
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      globalRouter.router?.push("/");
    }
    return Promise.reject(error);
  }
);
export { UAPI, AAPI };
