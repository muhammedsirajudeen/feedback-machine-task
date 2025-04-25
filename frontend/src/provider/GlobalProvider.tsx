'use client'
import React, { useEffect } from "react";
import GlobalContext from "./GlobalContext";
import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/types/User";
export default function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    useEffect(() => {
        async function userFetcher() {
            try {
                const response = await axiosInstance.get('/user/verify')
                setUser(response.data.user)
                setIsLoggedIn(true)
                
            } catch (error) {
                console.log(error)
                setIsLoggedIn(false)
            }
        }
        userFetcher()
    }, [])
    return (
        <GlobalContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </GlobalContext.Provider>
    );
}