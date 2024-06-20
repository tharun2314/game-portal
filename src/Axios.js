import axios from "axios"; 

const Axios = axios.create({
  baseURL : process.env.REACT_APP_BASE_URL,
  headers: {
    ContentType: "application/json",
    timeout : 1000,
  },
});
Axios.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `${localStorage.getItem('access_token')}`;
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );
export default Axios;