import { useState } from "react"
import { useAuth } from "../auth/authContext";

export const Signup = () =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {signup} = useAuth();

    return (
        <>
          <h1>Signup</h1>
          <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
          <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
          <button onClick={()=>{signup(email,password)}}>Signup</button>
        </>
    )
}