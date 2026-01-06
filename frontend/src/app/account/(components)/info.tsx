import { Card } from "@/components/ui/card";
import { AccountProps } from "@/lib/type";
import React, { useState, useRef, ChangeEvent } from "react";
import user_fallback from "../../assets/user_profile_pick_fallback.png";
import {
  Briefcase,
  Camera,
  FileText,
  Mail,
  NotepadText,
  Phone,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/context/AppContext";

const Info: React.FC<AccountProps> = ({ user, isYourAccount }) => {
  const [btnLoading, setBtnLoding] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editRef = useRef<HTMLInputElement | null>(null);
  const resumeRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const {updateProfilePic,updateResume} =useAppData();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      updateProfilePic(formData);
    }
  };

  const handleEditClick = () => {
    editRef.current?.click();
    setName(user.name);
    setPhoneNumber(user.phone_number);
    setBio(user.bio || "");
  };
  const updateProfileHandler = () => {};

  const changeResume = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please upload a pdf file");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      updateResume(formData);//api call
      
    }
  };

  const handleResumeClick=()=>{
    resumeRef.current?.click();
  }

  return (
    <div className="mx-w-5xl mx-auto px-4 py-8">
      <Card className="overflow-hidden shadow-lg border-2">
        <div className="h-32 bg-blue-500 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="relative-group">
              <div className="w-36 h-40 rounded-full border-4 border-background overflow-hidden sladow-xl bg-background">
                <img
                  src={user.profile_pic || user_fallback.src}
                  alt="User profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* edit option for your profile pic */}
              {isYourAccount && (
                <>
                  <Button
                    variant={"secondary"}
                    size={"icon"}
                    onClick={handleClick}
                    className="absolute bottom-0 right-0 rounded-full h-10 w-10 shadow-lg"
                  >
                    <Camera size={18} />
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={inputRef}
                    onChange={changeHandler}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        {/* main content */}
        <div className="pt-20 pb-8 px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                {/* edit button */}
              </div>
              <div className="flex items-center gap-2 text-sm opacity-70">
                <Briefcase size={16} />
                <span className="capitalize">{user.role}</span>
              </div>
            </div>
          </div>
          {/* bio section */}
          {user.role === "jobseeker" && user.bio && (
            <div className="mt-6 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2 text-sm font-medium opacity-70">
                <FileText size={18} />
                <span>About</span>
              </div>
              <p className="text-base leading-relaxed">{user.bio}</p>
            </div>
          )}
          {/* contact info */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg border hover:border-blue-500 transition-colors">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Mail size={18} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs opacity-70 font-medium">Email</p>
                  <p className="text-sm truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border hover:border-blue-500 transition-colors">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Phone size={18} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs opacity-70 font-medium">Phone Number</p>
                  <p className="text-sm truncate">{user.phone_number}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Resume section */}
          {user.role === "jobseeker" && user.resume && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mt-4 flex items-center gap-2 ">
                <NotepadText size={18} className="text-blue-600" /> Resume
              </h2>
              <div className="flex items-center gap-3 p-4 rounded-lg border hover:border-blue-500 transition-colors">
                <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-100 flex items-center justify-center">
                  <NotepadText size={20} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Resume Document</p>
                  <Link
                    href={user.resume}
                    className="text-sm text-blue-500 hover:underline"
                    target="_blank"
                  >
                    View Resume PDF
                  </Link>
                </div>
                <Button variant={"outline"} size={"sm"} onClick={handleResumeClick}>
                  Update
                </Button>
                <input type="file" ref={resumeRef} className="hidden"
                accept="application/pdf" onChange={changeResume}/>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Info;
