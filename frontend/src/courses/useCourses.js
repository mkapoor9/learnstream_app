import {useEffect,useState} from 'react'
import api from '../api/client'

export const useCourses = () =>{
    const [courses,setCourses] = useState();
    const [loading,setLoading] = useState(true);

    const fetchCourse = async () =>{
        const res = await api.get('/course')
        setCourses(res.data);
        setLoading(false)
    }

    useEffect(()=>{
        fetchCourse();
    },[])

    return {courses,loading}
}