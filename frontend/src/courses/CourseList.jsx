import { useNavigate } from "react-router-dom";
import { useCourses } from "./useCourses";

export default function CourseList(){
    const navigate = useNavigate();
    const {courses,loading} = useCourses();

    if(loading) return <p>Loading....</p>

    return (
        <div>
            <h2>Courses</h2>
            {courses.map((course)=>(
                <div
                  key={course.id}
                  style={{ border: "1px solid #ddd", padding: 12, marginBottom: 10 }} 
                >
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <button onClick={()=>(navigate(`/courses/${courses.id}`))}>
                        View Course
                    </button>
                </div>
            ))}
        </div>
    )
}