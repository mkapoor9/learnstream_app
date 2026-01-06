import { useNotifications } from "./useNotification";

export default function NotificationPage(){
    const {loading,markAsRead,notifications} = useNotifications();
    
    if(loading) return <p>Loading Notifications...</p>
    
    console.log(notifications)

    if(!notifications || notifications.length===0) return <p>No Notifications</p>

    return (
        <div>
            <h2>Notifications</h2>
            {
                notifications.map((n)=>(
                    <div
                     key={n.id}
                     style={{
                        border:"1px solid #ddd",
                        padding:"10px",
                        marginBottom:"10px",
                        background: n.read?"#f9f9f9":"e6f0ff"
                     }}>
                        <strong>{n.title}</strong>
                        <p>{n.message}</p>
                        {!n.read &&(
                            <button onClick={()=>markAsRead(n.id)}>
                                Mark as Read
                            </button>
                        )}
                    </div>
                ))
            }
        </div>
    )
}