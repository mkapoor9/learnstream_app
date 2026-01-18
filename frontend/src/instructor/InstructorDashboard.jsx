import { useState } from "react";
import CreateCourseForm from "./CreateCourseForm";
import MyCreatedCourses from "./MyCreatedCourse";

export default function InstructorDashboard() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <h2>Instructor Dashboard</h2>

      <CreateCourseForm onCreated={() => setRefresh(refresh + 1)} />

      {/* refresh trick is optional, simple for now */}
      <MyCreatedCourses key={refresh} />
    </div>
  );
}
