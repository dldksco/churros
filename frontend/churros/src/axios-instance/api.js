import axios from "axios";
//  axios instances
// to api server
const api = axios.create({
  baseURL: "https://churros.site/api",
});

export default api;
