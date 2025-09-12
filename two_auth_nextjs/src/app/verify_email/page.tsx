"use client";
import React,{useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";

export default  function VerifyEmailPage() {
    const [token,setToken] = useState("")
    const [verified,setVerified] = useState(false)
    const [error,setError] = useState(false)

    const verifyUserEmail=async()=>{
        try {
            await axios.post('/api/users/verify_email',{token})
            setVerified(true)
        } 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error:any) {
            console.log("verifyUserEmail error",error.response.data)
            setError(true)
        }
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();}
    },[token])
    useEffect(()=>{
       const urlToken = window.location.search.split("=")[1];
       setToken(urlToken || "")
    },[])

    return(
        <div className="min-h-screen py-2 flex flex-col items-center justify-center"> 
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` :"no token"}</h2>
            {verified && (
                <div className="text-2xl">Email Verified
                <Link href={"/login"}>Login</Link></div>
            )}
            {error && (
                <div className="text-2xl bg-red-500">Error
                </div>
            )}

        </div>
    )
}