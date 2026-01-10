import { useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react';

export default function LessonView(){
    const {lessonId} = useParams();
    const navigate = useNavigate();
    const [lesson,setLesson] = useState(null);
}