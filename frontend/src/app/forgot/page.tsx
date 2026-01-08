/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth_service, useAppData } from "@/context/AppContext";
import axios from "axios";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Mail, ArrowRight } from "lucide-react";

const ForgotPage = () => {
    const [email, setEmail] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
    const { isAuth } = useAppData();
    const router = useRouter();
    
    useEffect(() => {
        if (isAuth) router.replace("/");
    }, [isAuth, router]);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setBtnLoading(true);

        try {
            const { data } = await axios.post(
                `${auth_service}/api/auth/forgot-password`,
                { email }
            );
            toast.success(data.message);
            setEmail("");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                        Forgot Your{" "}
                        <span className="bg-gradient-to-r from bg-blue-600 to-blue-800 bg-clip-text text-transparent">
                            Password
                        </span>
                    </h1>
                    <p className="text-sm opacity-70">
                        Enter your email address and we&apos;ll send you a link to reset your password
                    </p>
                </div>

                <div className="border border-gray-400 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
                    <form onSubmit={submitHandler} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-200" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full h-11 rounded-md border border-gray-400 bg-transparent pl-10 pr-3 text-sm 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-200"
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={btnLoading} 
                            className="w-full"
                        >
                            {btnLoading ? "Sending..." : "Send Reset Link"}
                            <ArrowRight size={18} />
                        </Button>
                    </form>

                    <div className="mt-6 p-6 border-t border-gray-400">
                        <p className="text-center text-sm">
                            Remember your password?{" "}
                            <Link
                                href="/login"
                                className="text-blue-500 font-medium hover:underline transition-all"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPage;
