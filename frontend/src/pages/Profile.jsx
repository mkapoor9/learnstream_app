import { Link } from "react-router-dom";
import { useAuth } from "../auth/authContext"

export const Profile = ()=>{

    const {user,logout} = useAuth();

    if(!user) return <p>Loading...</p>

    {(user?.role === "INSTRUCTOR" || user?.role === "ADMIN")&&(
      <Link to='/instructor'>Instructor Dashboard</Link>
    )}

    return (
        <>
          <h2>Profile</h2>
          <p>{user.email}</p>
          <p>{user.name}</p>
        </>
    )
}