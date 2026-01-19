import {useEffect,useState} from 'react';
import api from '../api/client';
import { useNavigate } from 'react-router-dom';

export default function MyCreatedCourses(){
    const [courses,setCourses] = useState([])
    const navigate = useNavigate();

    const load = async() =>{
        const res = await api.get('/course/created/me');
        console.log(res.data)
        setCourses(res.data)
    }

    useEffect(()=>{
        load();
    },[])

    return (
        <div>
            <h3>Created Courses</h3>

            {courses.map((c)=>(
                <div key={c.id}>
                    <b>{c.title}</b>
                    <p>{c.description}</p>
                    <button onClick={()=>navigate(`/instructor/course/${c.id}`)}>
                        Manage Lessons
                    </button>
                </div>    
            ))}
        </div>
    )
}