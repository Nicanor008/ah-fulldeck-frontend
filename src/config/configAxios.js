import axios from "axios";
import config from ".";

const token = localStorage.getItem("token");
const axiosConfig = axios;
if (token) {
  axiosConfig.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
}
axios.defaults.baseURL = config.BASE_URL;
axios.defaults.baseURL = "http://127.0.0.1:8000";

export default axiosConfig;
