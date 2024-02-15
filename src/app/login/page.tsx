"use client";
import Link from "next/link";
import React , {useState,useEffect} from 'react';
import axios from 'axios'
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';


export default function LoginPage(){
  const router=useRouter();
  const [user,setUser]=useState({
    email:"",
    password:"",
  })
  const [buttonDisabled,setButtonDisabled]=useState(false);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    if (user.email.length>0 && user.password.length>0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }

  },[user])

  const onLogin= async ()=>{
    try{
      setLoading(true);
      const response=await axios.post("/api/users/login",user);
      console.log("Login success", response.data);
      router.push("/profile?loginSuccess=true");
    }catch(e:any) {
      console.log("login failed",e.message);
      toast.error("Either Email or Password is wrong");
    } finally{
      setLoading(false);
    }

  }

  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Toaster position='top-center'/>
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 m-2">Login</button>
            <div className="flex"> 
            <div className='font-light small'>Create an accout</div>
            <button
            className="border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "><Link className='text-blue-500' href="/signUp">Signup</Link></button>
            </div>
        </div>
  )
}
