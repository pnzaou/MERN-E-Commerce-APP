import axios from "axios"
import { baseURL } from "../common/summaryApi"

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

export default axiosInstance