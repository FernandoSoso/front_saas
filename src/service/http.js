import axios from "axios";

const API_URL = import.meta.env.API_URL

const http = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default http;