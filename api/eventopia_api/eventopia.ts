import axios from "axios";

export const eventopiaApi = axios.create({
  baseURL: "http://nawaytes.cloud:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
