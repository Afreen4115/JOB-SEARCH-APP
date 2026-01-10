/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useRazorpay from "@/components/scriptLoader";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { payment_service, useAppData } from "@/context/AppContext";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import { Card } from "@/components/ui/card";
import { CheckCircle, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const SubscriptionPage = () => {
  const razorPayLoaded = useRazorpay();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { setUser } = useAppData();
  const handleSubscribe = async () => {
      const token = Cookies.get("token");
    console.log("token here",token)
    setLoading(true);
    const {
      data: { order },
      } = await axios.post(
          `${payment_service}/api/payment/checkout`,
          {}, // 👈 request body
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );

    const options = {
      key: "rzp_test_S24ExEf4Jm7NCo",
      amount: order.amount,
      currency: "INR",
      name: "HireHub",
      description: "Find your dream job easily",
      order_id: order.id,
      handler: async function (response: any) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          const { data } = await axios.post(
            `${payment_service}/api/payment/verify`,
            { razorpay_order_id, razorpay_payment_id, razorpay_signature },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.success(data.message);
          setUser(data.updatedUser);
          router.push(`/payment/success/${razorpay_payment_id}`);
          setLoading(false);
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        }
      },
      theme: {
        color: "#F37254",
      },
    };
    if (!razorPayLoaded) console.log("Something went wrong with the script");
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  if (loading) return <Loading />;
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-secondary/30">
      <Card className="max-w-md w-full p-8 text-center shadow-lg border-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dar:bg-blue-900 mb-4">
          <Crown size={32} className="text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Premium Subscription</h1>
        <p className="text-sm opacity-60 mt-1">Boost your job search</p>
        <div className="mb-6">
          <p className="text-5xl font-bold text-blue-600">₹ 191</p>
          <p className="text-sm opacity-60 mt-1">Per month</p>
        </div>
        <div className="space-y-3 mb-8 text-left">
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
            <p className="text-sm">
              Your application will be shown first to recruiters
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
            <p className="text-sm">
                Priority Support
            </p>
          </div>
        </div>
        <Button onClick={handleSubscribe} className="w-full h-12 text-base gap-2">
          <Crown size={18}/> Subscribe Now
        </Button>
      </Card>
    </div>
  );
};

export default SubscriptionPage;
