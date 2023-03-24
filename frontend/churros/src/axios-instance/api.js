import axios from "axios";
//  axios instances
const api = axios.create({
  baseURL: "https://churros.site/api",
});

export default api;
