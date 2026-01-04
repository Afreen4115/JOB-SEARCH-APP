"use client";

import { AppProviderProps,User } from "@/lib/type";
import { AppContextType } from "@/lib/type";
import { createContext,useState,useContext } from "react";
import {Toaster} from 'react-hot-toast'

export const auth_service = "http://localhost:5000";
export const utils_service="http://localhost:5001";
export const user_service = "http://localhost:5002";
export const job_service = "http://localhost:5003";



const AppContext=createContext<AppContextType | undefined>(undefined);

export const AppProvider:React.FC<AppProviderProps>=({children})=>{
    const [user,setUser] = useState<User | null>(null);
    const [isAuth,setIsAuth]=useState(false);
    const [loading,setLoading]=useState(true);
    const [btnLoading,setBtnLoading]=useState(false);

    return (
        <AppContext.Provider value={{user,loading,btnLoading,setUser,isAuth,setIsAuth,setLoading}}>
            {children}
            <Toaster/>
        </AppContext.Provider>
    )

}

export const useAppData = (): AppContextType => {
    const context = useContext(AppContext);
    if(!context){
        throw new Error("Useapp data must be used within AppProvider");
    }
    return context;
}