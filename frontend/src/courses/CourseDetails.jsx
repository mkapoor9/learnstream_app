import {useEffect,useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export default function CourseDetails(){
    const {courseId} = useParams();
    const navigate = useNavigate();

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
                    <button onClick={()=>(navigate(`/lesson/${lesson.id}`))}>
                        Open Lesson
                    </button>
                </div>
            ))}
        </div>
    )
}