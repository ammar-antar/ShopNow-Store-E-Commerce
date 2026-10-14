import axios from "axios";

const client = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

export default client;