"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const localStorageUtils_1 = require("../utils/localStorageUtils");
console.log("API URL:", process.env.REACT_APP_API_URL);
// Create an Axios instance
const api = axios_1.default.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});
// Add a request interceptor to include JWT and CSRF tokens
api.interceptors.request.use((config) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, localStorageUtils_1.lsGetJwtToken)();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    let csrfToken = (0, localStorageUtils_1.lsGetCsrfToken)();
    if (!csrfToken) {
        try {
            const response = yield axios_1.default.get(`${process.env.REACT_APP_API_URL}/api/csrf/token`, { withCredentials: true });
            csrfToken = response.data.token;
            csrfToken && (0, localStorageUtils_1.lsSetCsrfToken)(csrfToken);
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
}), (error) => {
    return Promise.reject(error);
});
exports.default = api;
