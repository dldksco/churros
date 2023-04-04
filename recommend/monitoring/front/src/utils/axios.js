import axios from 'axios';

const baseURL = "http://localhost:4444"

export const api = {
    success:(params) => axios.get(`${baseURL}/success`, {params})
}