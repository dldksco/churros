import axios from "axios";
//  axios instances
// to api server
const test = axios.create({
  baseURL: "https://churros.site/api/test",
});

export default test;