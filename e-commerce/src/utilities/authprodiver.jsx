import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext=createContext(null)
export const Authprodiver=({children})=> {
    const navigate = useNavigate()

    const [user,setuser]=useState(null)
    const [loading,setloading]=useState(true)

    const login=async(email,password,user)=>{
         const res = await fetch("http://localhost:3000/",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({
                    email,
                    password
                })
            })
        
            setuser(user)
            setloading(false)
            const data = await res.json()
        
            if(data.success){
                navigate("/home")
            }else{
                alert("Login failed")
            }
    }
    const logout=()=>{
        setuser(null)
    }

  return (
    
    <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>
  )
}

export const useauth=()=>{
    return useContext(AuthContext)
}