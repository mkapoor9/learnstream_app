export default function InstructorCourseManage(){
    const {courseId} = useParams();
    const [lessons,setLessons] = useState([]);

    const loadLessons = async() =>{
        const res = await api.get(`/content/course/${courseId}`);
        setLessons(res.data);
    }

    useEffect(()=>{
        loadLessons();
    },[courseId])


    return (
    <div>
      <h2>Manage Course Lessons</h2>

      <AddLessonForm courseId={courseId} onAdded={loadLessons} />

      <h3 style={{ marginTop: 20 }}>Lessons</h3>
      {lessons.map((l) => (
        <div
          key={l.id}
          style={{ border: "1px solid #eee", padding: 10, marginBottom: 8 }}
        >
          <b>
            {l.order}. {l.title}
          </b>
        </div>
      ))}
        </div>
    )
}