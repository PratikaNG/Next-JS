"use client"
import React,{FormEvent, useState} from "react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
function Page() {
    const [email,setEmail]= useState("")
    const [message,setMessage]= useState("")
    const [submit,setSubmit]= useState(false)
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setSubmit(true);
        console.log("email,m",email,message)
    }
     const Successwords = [
    {
      text: "Message sent.",
    },
    
    {
      text: "Thank you.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
     const Failurewords = [
    {
      text: "Message not sent.",
    },
    
    {
      text: "Something went wrong.",
      className: "text-red-500 dark:text-red-500",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 pt-36 relative">
        <div className="max-w-2xl mx-auto p-4 relative z-10">
        
        <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
          Contact Us
        </h1>
         <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center">
          We&apos;re here to help with any questions about our courses,
          programs, or events. Reach out and let us know how we can assist you
          in your musical journey.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
            />
            <input
            type="text"
            name="message"
            placeholder="Enter your message"
            value={message}
            onChange={(e)=>{setMessage(e.target.value)}}
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
            />
            <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </form>
        {submit ? <TypewriterEffectSmooth words={Successwords} /> : null }
        </div>
      
    </div>
  )
}

export default Page
