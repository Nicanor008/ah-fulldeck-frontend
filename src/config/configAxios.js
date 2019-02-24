import axios from 'axios';
import config from '.';

const token = localStorage.getItem('token');
const axiosConfig = axios;
if (token) {
  axiosConfig.defaults.headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  };
}
axios.defaults.baseURL = config.BASE_URL;

export default axiosConfig;
