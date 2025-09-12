"use client";
import React,{useEffect, useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [buttonDisabled,setButtonDisabled] = useState(false)
  const [loading,setLoading] = useState(false)
    const [user,setUser] = useState({
        email:"",
        username:"",
        password:""
    })

    const onSignUp = async()=>{
      try {
        setLoading(true)
        const response = await axios.post("/api/users/signup",user)
        console.log("Signup success",response.data)
        router.push('/login')
      } 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error:any) {
        console.log("Signup failed",error.message)
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }

    useEffect(()=>{
      if(user.email.length > 0 && user.password.length > 0 && user.username.length>0){
        setButtonDisabled(false)
      }else setButtonDisabled(true)
    },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-300">
      <h1 className="text-3xl md:text-5xl text-pink-700">{loading ? "Processing" : "Signup"}</h1>
      <div className="p-6 m-4 rounded border border-amber-50 flex flex-col items-center justify-around bg-slate-900">
      <hr/>
      <div className="flex flex-col md:flex-row justify-between items-baseline gap-2 w-full">
        <label htmlFor="username" >Username:</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e)=>setUser({...user,username:e.target.value})}
        placeholder="username"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-baseline gap-2 w-full">
        <label htmlFor="email" >Email: </label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e)=>setUser({...user,email:e.target.value})}
        placeholder="email"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-baseline gap-2 w-full">
        <label htmlFor="password">Password: </label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black"
        id="password"
        type="text"
        value={user.password}
        onChange={(e)=>setUser({...user,password:e.target.value})}
        placeholder="password"
        />
      </div>
      <div className="flex justify-between items-center gap-2 border border-t-2 border-b-2 border-l-0 border-r-0 mt-3 mb-1">
      <button 
      onClick={onSignUp}
      disabled={buttonDisabled}
      className="p-2 m-2 border border-gray-400 rounded-2xl focus:outline-none focus:border-gray-600">{buttonDisabled ? <span className="text-red-500 font-bold">No Signup</span> : <span className="text-blue-700 font-bold">Signup</span>}</button>
      <div className="text-3xl text-pink-700 m-4">|</div>
      <Link href={"/login"}>Visit login page</Link></div>
      </div>
    </div>
  )
}

