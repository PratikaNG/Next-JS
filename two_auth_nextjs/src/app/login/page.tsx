"use client";
import React,{useEffect, useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {v1_url} from "@/app/api/url_constants"
export default function LoginPage() {
  const router = useRouter();
  const [buttonDisabled,setButtonDisabled] = useState(false)
    const [loading,setLoading] = useState(false)
    const [user,setUser] = useState({
        email:"",
        password:""
    })

    const onLogin = async()=>{
 try {
        setLoading(true)
        const response = await axios.post(v1_url.login_url,user)
        console.log("Login success",response.data)
        toast.success("Login success")
        router.push('/profile')
      } catch (error:any) {
        console.log("Login failed",error.message)
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }
    useEffect(()=>{
          if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
          }else setButtonDisabled(true)
        },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 >Login</h1>
      <hr/>
      
      <label htmlFor="email">Email</label>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black"
      id="email"
      type="text"
      value={user.email}
      onChange={(e)=>setUser({...user,email:e.target.value})}
      placeholder="email"
      />
      <label htmlFor="email">Password</label>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black"
      id="password"
      type="text"
      value={user.password}
      onChange={(e)=>setUser({...user,password:e.target.value})}
      placeholder="password"
      />
      <button 
      onClick={onLogin}
      className="p-2 m-2 border border-gray-400 rounded-2xl focus:outline-none focus:border-gray-600">Login</button>
      <Link href={"/signup"}>Visit signup page</Link>
    </div>
  )
}




