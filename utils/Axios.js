import axios from "axios";

export const baseURL = 'http://192.168.191.186:3000/api'
export const baseURL2 = 'http://192.168.191.186:3000'

export const Axios = axios.create({
    baseURL,
})