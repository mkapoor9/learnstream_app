import {useState} from 'react'
import api from '../api/client';

export default function CreateCourseForm({onCreated}){

    const[title,setTitle] = useState('');
    const [description,setDescription] = useState('');

    const createCourse = async() =>{
        const res = await api.post('/course',{title,description})
        onCreated?.(res.data);
        setTitle("");
        setDescription("");
    }

    return (
        <div>
            <h3>Create New Course</h3>
            <input
              placeholder="Course Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />

            <br/>

            <textarea
             placeholder="Course Description"
             value={description}
             onChange={(e)=>setDescription(e.target.value)}
             />

            <br/>

            <button onClick={createCourse}>Create Course</button>
        </div>
    )
}