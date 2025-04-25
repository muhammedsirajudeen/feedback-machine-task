import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
})

axiosInstance.interceptors.request.use(config => {
    if (typeof window !== "undefined") {
        const token = window.localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = token
        }
    }
    return config
})

export default axiosInstance
