import axios from "axios";

export const baseApiUrl = "https://fakestoreapi.com";

export const api = axios.create({ baseURL: baseApiUrl });
