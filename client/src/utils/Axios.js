import axios from "axios"
import SummaryApi, { baseURL } from "../common/summaryApi"

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    async(config)=>{
        const accessToken = localStorage.getItem('accessToken')

        if(accessToken){
            config.headers.Authorization `Bearer ${accessToken}`
        }

        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.request.use(
    (rep)=>{
        return rep
    },
    async(error)=>{
        let originRequest = error.config

        if(error.response.status === 401 && !originRequest.retry){
            originRequest.retry = true

            const refreshToken = localStorage.getItem('refreshToken')

            if(refreshToken){
                const newAccessToken = await refreshAccessToken(refreshToken)

                if(newAccessToken){
                    originRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return axiosInstance(originRequest)
                }
            }
        }

        return Promise.reject(error)
    }
)

const refreshAccessToken = async (refreshToken) => {
    try {
        const rep = await axiosInstance({
            ...SummaryApi.refreshToken,
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        })

        const accessToken = rep.data.data.accessToken
        localStorage.setItem('accessToken', accessToken)
        return accessToken
    } catch (error) {
        console.log(error)
    }
}

export default axiosInstance