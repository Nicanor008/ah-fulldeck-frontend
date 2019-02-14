import axios from "axios";
import config from '.'

const token = localStorage.getItem("token");
const axiosConfig = axios;
if (token) {
  axios.defaults.headers.common.Authorization = token;
}
axios.defaults.baseURL = config.BASE_URL;

export default axiosConfig;
