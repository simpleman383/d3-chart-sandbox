import axios from "axios";

const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "/api";
  }
  else {
    return "http://localhost:3001/api";
  }
};


export const httpClient = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30 * 1000
});