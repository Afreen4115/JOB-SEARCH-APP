/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth_service, useAppData } from "@/context/AppContext";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const ResetPage = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const { isAuth } = useAppData();
    const router = useRouter();

    useEffect(() => {
        if (isAuth) router.replace("/");
    }, [isAuth, router]);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validate passwords match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // Validate password length
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setBtnLoading(true);

        try {
            const { data } = await axios.post(
                `${auth_service}/api/auth/reset-password/${token}`,
                { password }
            );
            toast.success(data.message);
            // Redirect to login page after successful reset
            setTimeout(() => {
                router.push("/login");
            }, 1500);
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
                        Reset Your{" "}
                        <span className="bg-gradient-to-r from bg-blue-600 to-blue-800 bg-clip-text text-transparent">
                            Password
                        </span>
                    </h1>
                    <p className="text-sm opacity-70">Enter your new password below</p>
                </div>

                <div className="border border-gray-400 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
                    <form onSubmit={submitHandler} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                New Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-200" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full h-11 rounded-md border border-gray-400 bg-transparent pl-10 pr-10 text-sm 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-200" />
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full h-11 rounded-md border border-gray-400 bg-transparent 
                               pl-10 pr-10 text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                               dark:text-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {password && confirmPassword && password !== confirmPassword && (
                                <p className="text-sm text-red-500">Passwords do not match</p>
                            )}
                        </div>

                        <Button 
                            type="submit" 
                            disabled={btnLoading || password !== confirmPassword || password.length < 6} 
                            className="w-full"
                        >
                            {btnLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPage;
