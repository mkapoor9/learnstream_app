import { useAuth } from "../auth/authContext"

export const Profile = ()=>{

    const {user,logout} = useAuth();

    if(!user) return <p>Loading...</p>

    return (
        <>
          <h2>Profile</h2>
          <p>{user.email}</p>
          <p>{user.name}</p>
        </>
    )
}