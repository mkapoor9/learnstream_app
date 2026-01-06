import { useEffect,useState } from "react";
import api from "../api/client";

export const useNotifications = () =>{
    const [notifications, setNotifications] = useState([]);
    const [unreadCount,setUnreadCount] = useState(0);
    const [loading,setLoading]= useState(false);

    const fetchNotification = async()=>{
        const res = await api.get('/notification');
        console.log(res.data)
        setNotifications(res.data);
    }

    const fetchUnreadCount = async() =>{
        const res =await api.get('/notification/unread-count')
        setUnreadCount(res.data.count);
    }

    const markAsRead = async(id) =>{
        await api.put(`/notification/${id}/read`)
        await fetchNotification();
        await fetchUnreadCount();
    }

    useEffect(()=>{
        fetchNotification();
        fetchUnreadCount();
        setLoading(false);
    },[]);

    return {
        notifications,
        unreadCount,
        markAsRead,
        loading
    }
}