import axios from "axios";
import { router } from "expo-router";

let logoutMethod: any;
export function setLogoutMethod(method: () => void) {
    logoutMethod = method;
}

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8080/api/v1'
    baseURL: 'http://192.168.0.109:8080/api/v1'
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && originalRequest.url.includes('/logout')) {
            return Promise.reject(error)
        }
        if (error.response.status === 401) {
            if (logoutMethod) {
                logoutMethod();
                router.replace('/(auth)/sign-in');
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
