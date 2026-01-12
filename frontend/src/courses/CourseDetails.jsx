import {useEffect,useState} from 'react';
import { Outlet,useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';


export default function CourseDetails(){
    console.log("COURSE DETAILS")
    const {courseId} = useParams();
    const navigate = useNavigate();

    console.log(courseId)

    const [lessons,setLessons] = useState([]);
    const [progress,setProgress] = useState(null);

    useEffect(()=>{
        api.get(`/content/course/${courseId}`).then((res)=>{
            setLessons(res.data)
        })

        api.get(`/content/course/${courseId}/progress`).then((res)=>{
            setProgress(res.data)
        })
    },[courseId]);

    return (
        <div>
            <button onClick={()=>(navigate(-1))}>Go Back</button>

            <h2>Lessons</h2>

            {progress && (
                <p>
                    Progress : {progress.completed}/{progress.total} (
                        {progress.percentage}%
                    )
                </p>
            )}

            {lessons.map((lesson)=>(
                <div
                  key={lesson.id}
                  style={{ border: "1px solid #ddd", padding: 12, marginBottom: 10 }}
                >
                    <h4>{lesson.title}</h4>
                    <button onClick={()=>(navigate(`lesson/${lesson.id}`))}>
                        Open Lesson
                    </button>
                </div>
            ))}
            <Outlet/>
        </div>
    )
}