import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

const apiKey =
  process.env.NEXT_PUBLIC_API_KEY;

export const api = axios.create({
  baseURL,

  headers: {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
  },
});

api.interceptors.request.use((config) => {
  console.log(
    `[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
  );

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    console.error("[API ERROR]", {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });

    return Promise.reject(error);
  }
);