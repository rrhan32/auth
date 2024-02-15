"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function Profile() {
  const router = useRouter();
  const SearchParams = useSearchParams();
  const [loginSuccess, setLoginSuccess] = useState(SearchParams.get("loginSuccess")!);
  const [data, setData] = useState("");
  useEffect(() => {
    const noti=localStorage.getItem('notifshown');
    console.log(noti);
    if (loginSuccess === "true" && noti=== null) {
      // Show success toast
      console.log("reached here")
      toast.success("Login successful");
      localStorage.setItem('notifshown','true');
    }
  });

  const onLogout = async () => {
    const response = await axios.get("/api/users/logout");
    console.log(response);
    setLoginSuccess("false");
    localStorage.clear();
    router.push("/login");
  };
  const getUserDetails = async () => {
    if (data.length > 0) {
      setData("");
      return;
    }
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col text-center justify-center min-h-screen text-red-600">
      <Toaster position="top-center" />
      <div>{data}</div>
      <div> toh kaise hai aap log</div>
      <button onClick={onLogout} className="">
        logout
      </button>
      <button className="text-red" onClick={getUserDetails}>
        {data.length == 0 ? "GET DETAILS" : "HIDE DETAILS"}
      </button>
    </div>
  );
}

export default Profile;
