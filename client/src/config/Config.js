import axios from "axios";

const isLocalHost = Boolean(
    window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
        /^27(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

const API_URL = isLocalHost
            ? "http://localhost:5000/api/"
            : "https://socialbookapi.fr"

export const Axios = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});