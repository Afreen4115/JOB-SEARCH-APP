"use client"
import { user_service } from '@/context/AppContext';
import { User } from '@/lib/type'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Loading from '@/components/loading';
import Info from '../(components)/info';
import toast from 'react-hot-toast';

const UserAccount = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    async function fetchUser() {
        const token = Cookies.get("token");
        try {
            const { data } = await axios.get(`${user_service}/api/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            console.log("not found user",error);
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchUser();
    }, [id])

    if (loading) return <Loading />;


    return (
        <>
            {user && (
                <div className='w-[90%] md:w-[60%] m-auto'> 
                    <Info user={user} isYourAccount={false} />

                </div>
            )
            }
        </>
    )
}

export default UserAccount