import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

export default function InstructorRoute({children}){

    const {user,loading} = useAuth();
    
    if(loading) return <p>LOADIN....</p>

    if(!user) return <Navigate to='/login'/>

    if(user.role!=="INSTRUCTOR" && user.role!=='ADMIN'){
        return <p>403 Forbidden - Instructor access only</p>
    }

    return children
}