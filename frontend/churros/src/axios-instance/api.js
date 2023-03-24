import axios from "axios";

const api = axios.create({
  baseURL: "https://churros.site/api",
});

export default api;
