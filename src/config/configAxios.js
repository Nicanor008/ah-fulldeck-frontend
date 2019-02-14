import axios from "axios";

const token = localStorage.getItem("token");
const axiosConfig = axios;
if (token) {
  axios.defaults.headers.common.Authorization = token;
}
axios.defaults.baseURL = process.env.BASE_URL;

export default axiosConfig;
