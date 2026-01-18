    import { useNavigate } from "react-router-dom";
    import api from "../api/client";
    import { Children, createContext, useState,useContext, useEffect } from "react";

    export const AuthContext = createContext(null);



    export const AuthContextProvider=({children})=>{

        const navigate = useNavigate();
        
        const [user,setUser] = useState(null);
        const [loading,setLoading] = useState(true);

        const login = async (email,password) =>{
            const res = await api.post('/auth/login',{email,password});
            localStorage.setItem('accessToken',res.data.accessToken)
            await loadProfile();
            navigate('/')
        }

        const signup = async(email,password)=>{
            const res = await api.post('/auth/signup',{email,password});
            await loadProfile();
        }

        const logout = () =>{
            localStorage.removeItem('accessToken');
            setUser(null);
        }

        const loadProfile = async()=>{
            try {
                console.log(localStorage.getItem('accessToken'))
                const res = await api.get('/user/profile');
                setUser(res.data);
            } catch {
                logout();
            } finally{
                setLoading(false)
            }
        }

        useEffect(()=>{
            loadProfile();
        },[])

        const isInstructor = user?.role === "INSTRUCTOR";
        const isAdmin = user?.role === "ADMING";
        const isInstructorOrAdmin = isInstructor || isAdmin;

        return (
            <>
            <AuthContext.Provider value={{login,logout,signup,loadProfile,
                isInstructor,isAdmin,isInstructorOrAdmin,user,loading}}>
                {children}
            </AuthContext.Provider>
            </>
        )

    }

    export const useAuth = () =>useContext(AuthContext)