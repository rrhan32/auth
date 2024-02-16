"use client"
import Link from 'next/link'
import React,{useState,useEffect} from 'react';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function SignUp() {
  const [user,setUser] = useState({
    email:"",
    password:"",
    username:"",
  });
  const [Loading,setLoading]=useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const onSignup=async()=>{
    try{
      setLoading(true);
      const response:any=await axios.post("/api/users/signUp", user)
      console.log("Signed up success" , response.data);
      if (response.data.message) toast.success("successfully created");
      else if (response.data.error) toast.error("User already exists");
  }catch(e:any){
    console.log("signup failed", e.message);
    }
  finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false);
    } else {
        setButtonDisabled(true);
    }
}, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-center"/>
      <h1>{Loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({...user, username: e.target.value})}
          placeholder="username"
          />
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
          onClick={onSignup}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
          <Link href="/login">Visit login page</Link>
    </div>
  )

}