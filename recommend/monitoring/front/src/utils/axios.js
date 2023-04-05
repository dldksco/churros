import axios from 'axios';

const baseURL = "http://localhost:4444"

export const api = {
    success:(params) => axios.get(`${baseURL}/success`, {params}),
    dataset:() => axios.get(`${baseURL}/dataset`),
    error:(params) => axios.get(`${baseURL}/error`, {params})
}