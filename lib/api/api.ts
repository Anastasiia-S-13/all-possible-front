import axios from "axios";

const isServer = typeof window === "undefined";

const baseURL = isServer ? process.env.NEXT_PUBLIC_API_URL : "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
