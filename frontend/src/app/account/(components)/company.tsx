/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { job_service, useAppData } from "@/context/AppContext";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Company = () => {
  const { loading } = useAppData();

  const addRef = useRef<HTMLButtonElement | null>(null);

  const openDialog = () => {
    addRef.current?.click();
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  const clearData = () => {
    setName("");
    setDescription("");
    setLogo(null);
    setWebsite("");
  };
  const token = Cookies.get("token");
  const fetchCompanies = async () => {
    try {
      if (!token) return;

      const { data } = await axios.get(`${job_service}/api/job/company/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCompanies(data);
    } catch (error) {
      console.error(error);
    }
  };

  async function addCompanyHandler() {
    if (!name || !description || !website || !logo) {
      toast.error("Please provide all details");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("website", website);
    formData.append("file", logo);

    try {
      setBtnLoading(true);
      const { data } = await axios.post(
        `${job_service}/api/job/add/company`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      clearData();
      fetchCompanies();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.daa.message);
    } finally {
      setBtnLoading(false);
    }
  }

  async function deleteCompany(id: string) {
    try {
      setBtnLoading(true);
      const { data } = await axios.delete(
        `${job_service}/api/job/company/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      fetchCompanies();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setBtnLoading(false);
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Card className="shadow-lg border-2 overflow-hidden">
        <div className="bg-blue-500 p-6 brder-b">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Building2 size={20} className="text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-white">My Companies</CardTitle>
            <CardDescription className="text-sm mt-1 text-white">
              Manage your registered companies({companies?.length}/3)
            </CardDescription>
            {companies.length < 3 && (
              <Button onAbort={openDialog} className="gap-2">
                <Plus size={18} /> Add Company
              </Button>
            )}
          </div>
        </div>
        <div className="p-6">
          {companies.length>0?(
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companies.map((c:any, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-lg border-2
                 hover:border-blue-500 transition-all bg-background"
                >
                  
                </div>
              ))}
            </div>

          ):(<></>)}
        </div>
      </Card>
    </div>
  );
};

export default Company;
