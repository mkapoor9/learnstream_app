import { useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react';

export default function LessonView(){
    const {lessonId} = useParams();
    const navigate = useNavigate();
    const [lesson,setLesson] = useState(null);

    useEffect(()=>{

    },[lessonId])

    return (
        <div>
            <h2>{lesson.title}</h2>
            <div
              style={{
              whiteSpace: "pre-wrap",
              border: "1px solid #ddd",
              padding: 16,
            }}
            >
              {lesson.content}
            </div>

            <button onClick={completeLesson} style={{ marginTop: 16 }}>
                Mark as completed
            </button>
        </div>
    )
}