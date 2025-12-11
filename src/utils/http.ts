import axios from "axios";

export const http = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
    timeout: 8000
});