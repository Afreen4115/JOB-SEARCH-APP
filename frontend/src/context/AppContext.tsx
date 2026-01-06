"use client";

import { AppProviderProps, User } from "@/lib/type";
import { AppContextType } from "@/lib/type";
import { createContext, useState, useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

export const auth_service = "http://localhost:5000";
export const utils_service = "http://localhost:5001";
export const user_service = "http://localhost:5002";
export const job_service = "http://localhost:5003";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const token = Cookies.get("token");

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${user_service}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log("Login error", error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function updateProfilePic(formData:any) {
    setLoading(true);
    try {
      const {data}=await axios.put(`${user_service}/api/user/update/pic`,formData,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      toast.success(data.message);
      fetchUser();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(error.response?.data?.message);
    }finally{
      setLoading(false);
    }
  }
  
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   async function updateResume(formData:any){
     setLoading(true);
     try {
       const { data } = await axios.put(`${user_service}/api/user/update/resume`, formData,
         {
           headers: {
             Authorization: `Bearer ${token}`
           }
         }
       );
       toast.success(data.message);
       fetchUser();

       // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } catch (error: any) {
       toast.error(error.response?.data?.message);
     } finally {
       setLoading(false);
     }
   }

   async function updateUser(name:string,phoneNumber:string,bio:string){
        try {
          setBtnLoading(true);
          const {data}= await axios.put(`${user_service}/api/user/update/profile`,
            {
              name,phoneNumber,bio
            },{
              headers:{
                Authorization:`Bearer ${token}`
              }
            }
          );
          toast.success(data.message);
          fetchUser();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
          toast.error(error.response.data.message);
        }finally{
          setBtnLoading(false);
        }
   }

  async function logoutUser() {
    Cookies.set("token", "");
    setUser(null);
    setIsAuth(false);
    toast.success("Logged out successfully")
  }

  async function addSkill(skill:string,setSkill:React.Dispatch<React.SetStateAction<string>>){
      setBtnLoading(true);
      try {
        const {data}=await axios.post(`${user_service}/api/user/skill/add`,{skillName:skill},{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        toast.success(data.message);
        setSkill("");
        fetchUser();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        toast.error(error.response.data.message);
      }finally{
        setBtnLoading(false);
      }
  }

  async function removeSkill(skill: string) {
    try {
      const { data } = await axios.put(`${user_service}/api/user/skill/delete`, { skillName: skill }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(data.message);
      fetchUser();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }


  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        btnLoading,
        setUser,
        isAuth,
        setIsAuth,
        setLoading,
        logoutUser,
        updateProfilePic,
        updateResume,
        updateUser,
        addSkill,
        removeSkill
      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Useapp data must be used within AppProvider");
  }
  return context;
};
