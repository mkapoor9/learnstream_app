import { title } from "node:process"
import api from "../api/client"

export default function AddLessonForm({onAdded}){
    const[title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [order,setOrder] = useState(1);

    const addLesson = async()=>{
        const res = api.post('/content/lesson',{
            courseId,
            title,
            content,
            order:Number(order)
        })

        onAdded?.(res.data);

        setTitle("")
        setContent("")
        setOrder(order+1);
    }

    return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginTop: 10 }}>
        <h3>Add Lesson</h3>

        <input
            placeholder="Lesson title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <input
            placeholder="Order (1,2,3...)"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
        />

        <br />

        <textarea
            placeholder="Lesson content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            cols={50}
        />

        <br />

        <button onClick={addLesson}>Add Lesson</button>
        </div>
    )
}