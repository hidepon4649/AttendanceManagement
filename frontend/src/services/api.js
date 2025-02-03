import axios from "axios";
import { lsGetCsrfToken, lsGetJwtToken, lsSetCsrfToken } from "../utils/localStorageUtils";
console.log("API URL:", process.env.REACT_APP_API_URL);
// Create an Axios instance
const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});
// Add a request interceptor to include JWT and CSRF tokens
api.interceptors.request.use(async (config) => {
    const token = lsGetJwtToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    let csrfToken = lsGetCsrfToken();
    if (!csrfToken) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/csrf/token`, { withCredentials: true });
            csrfToken = response.data.token;
            csrfToken && lsSetCsrfToken(csrfToken);
        }
        catch (error) {
            console.error("Failed to fetch CSRF token", error);
        }
    }
    if (csrfToken) {
        config.headers["X-CSRF-TOKEN"] = csrfToken;
    }
    console.log("X-CSRF-TOKEN " + csrfToken);
    return config;
}, (error) => {
    return Promise.reject(error);
});
export default api;
