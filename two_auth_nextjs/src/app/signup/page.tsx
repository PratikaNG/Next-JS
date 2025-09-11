"use client";
import React,{useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const [user,setUser] = useState({
        email:"",
        username:"",
        password:""
    })

    const onSignUp = async()=>{

    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 >Signup</h1>
      <hr/>
      <label htmlFor="username">Username</label>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black"
      id="username"
      type="text"
      value={user.username}
      onChange={(e)=>setUser({...user,username:e.target.value})}
      placeholder="username"
      />
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
      onClick={onSignUp}
      className="p-2 m-2 border border-gray-400 rounded-2xl focus:outline-none focus:border-gray-600">Signup</button>
      <Link href={"/login"}>Visit login page</Link>
    </div>
  )
}

