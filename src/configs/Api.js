import axios from "axios";
import { getCookie, setCookie } from "../utils/cookies";
import { getNewToken } from "../services/token";

const Api = axios.create({
  baseURL: " http://localhost:3400/",
  headers: {
    "Content-Type": "application/json",
  },
});
Api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// expire shudan accesstoken:
//Understanding error.config
// When an error occurs, you can access the config property of the error object.
//This config property holds the original configuration of the request that resulted in the error.
//ba error.config mitonim be req asli dasresi peyda konim(error.config is the configuration object of the failed request.)
Api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalReq = error.config;
    console.log(originalReq);
    if (error.response.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      const res = await getNewToken();
      if (!res?.response) return;
      setCookie(res.response.data)
 
      return Api(originalReq)
    }
    return Promise.reject(error);
  }
);

export default Api;
