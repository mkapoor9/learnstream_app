import { useAuth } from "../auth/authContext";


export default function Profile(){
    const {user,logout} = useAuth();
    
    console.log("User inside profile page",user)
    if(!user) return <p>LOADING...</p>

    return(
        <div>
            <h2>Profile</h2>
            <p>Email : {user.email}</p>
            <p>Name: {user.name||"Not set"}</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}