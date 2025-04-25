import { User } from "@/types/User"
import axiosInstance from "./axiosInstance"

export async function checkUser() {
    const token = window.localStorage.getItem('token')
    if (!token) {
        return null
    }
    const response = await axiosInstance.get('/user/verify')
    return response.data.user as User

}