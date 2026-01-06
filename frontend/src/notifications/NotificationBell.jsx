import { useNavigate } from "react-router-dom";
import { useNotifications } from "./useNotification";

export default function NotificationBell(){
    const {unreadCount} = useNotifications();
    const navigate = useNavigate();

    return (
        <div
         style={{position:'relative',cursor:'pointer'}}
         onClick={()=> navigate('/notifications')}>
            🔔
            {unreadCount>0 && (
                <span
                 style={{
                    position:"absolute",
                    top:-5,
                    right:-5,
                    background:"red",
                    color: "white",
                    borderRadius:"50%",
                    padding:"2px 6px",
                    fontSize:"12 px"
                 }}>
                    {unreadCount}
                </span>
            )}
        </div>
    )
}