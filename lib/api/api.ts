import axios from "axios";

const baseURL = "http://localhost:3030"; //process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
