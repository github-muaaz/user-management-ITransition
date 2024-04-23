import axios from "axios";
import { get } from "lodash";
import { toast } from "react-toastify";

import storage from "../store/local-storage";
import configJson from "../config.json";
import history from "../router/history";
import localStorage from "../store/local-storage";

const request = axios.create({
    baseURL: configJson.apiEndpoint,
});

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Request interceptor
request.interceptors.request.use(
    (config) => {
        if (!config.headers.Authorization) {
            const storageItem = storage.get(configJson.storageKey);

            const token = get(storageItem, 'auth.token', {});

            if (token)
                config.headers.Authorization = `${get(token, "tokenType")} ${get(token, "accessToken")}`;
        }
        config.headers.TimeZone = timezone;
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
request.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('err', error)
        const statusCode = get(get(error, "response", {}), 'status');

        if (statusCode === 401 || statusCode === 403){
            history.push("/sign-in");
            localStorage.remove(configJson.storageKey);
        }

        toast.error(error?.response?.data?.errors?.[0]?.message || "error occured")

        return Promise.reject(error);
    }
);

export default request;