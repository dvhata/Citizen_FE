import axios from "axios";
import queryString from "query-string";
// Set up default config for http requests here
 
// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs
 
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json, text-plain, */*",
    // "X-Requested-With": "XMLHttpRequest",
    // "X-CSRF-TOKEN": token
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
 
export default axiosClient;
