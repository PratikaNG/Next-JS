"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"
import { useState } from "react"

export default function ProfilePage(){
  const [data,setData] = useState("nothing")
  const router = useRouter()
  const onLogout=async()=>{
    try {
      await axios.get('api/users/logout')
      toast.success("Logout successful")
      router.push('/login')
    } catch (error:any) {
        console.log("Logout failed",error.message)
        toast.error(error.message)
    }
  }

  const getUserDetails = async() =>{
    const res = await axios.get('/api/users/current_user')
    console.log("getUserDetails",res.data)
    setData(res.data.data._id)
  }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 >Profile</h1>
      <hr/>
      <h2 className="p-2 rounded bg-green-500">{data === "nothing" ? "Nothing " :<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr/>
      
      <button 
      onClick={onLogout}
      className="p-2 bg-blue-400 border border-gray-300 m-2 text-white text-2xl rounded">Logout</button>
      <button 
      onClick={getUserDetails}
      className="py-2 px-4 bg-green-400 m-2 text-white text-2xl rounded">getUserDetails</button>
        </div>
    )
}