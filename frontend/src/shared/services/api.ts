import axios from 'axios';

let isRefreshing = false;
let failedQueue: any[] = [];
const REFRESH_URL = "http://127.0.0.1:8000/account/login/refresh/";

const processQueue = ({ error, token = null }: { error: any; token: string|null }) => {

  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const createAPI = (baseURL: string) => {
  
  const instance = axios.create({ baseURL })

  instance.interceptors.request.use(config => {

    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config

  })

  instance.interceptors.response.use(
    res => res,
    async (err) => {
      const originalRequest = err.config;

      if (err.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
            .then(token => {
              originalRequest.headers["Authorization"] = "Bearer " + token
              return instance(originalRequest)
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem("refresh")

        try {
          const response = await axios.post(
            REFRESH_URL,
            { refresh: refreshToken }
          )

          const newAccess: string = response.data.access

          localStorage.setItem("token", newAccess)
          instance.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
          processQueue({ error: null, token: newAccess });
          return instance(originalRequest);

          } catch (refreshErr) {
            processQueue({ error: refreshErr, token: null });
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
            return Promise.reject(refreshErr);

          } finally {
            isRefreshing = false;
          }
        }

      return Promise.reject(err);
    }
  );

  return instance;
};

const API = {
  account: axios.create({baseURL: 'http://127.0.0.1:8000/account'}),
  finance: createAPI('http://127.0.0.1:8000/finance'),
  dashboard: createAPI('http://127.0.0.1:8000/dashboard'),
  planning: createAPI('http://127.0.0.1:8000/planning'),
}

export default API;
