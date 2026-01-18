import { useState } from 'react'
import { AuthContextProvider, useAuth } from './auth/authContext'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Profile } from './pages/Profile'
import NotificationBell from './notifications/NotificationBell';
import NotificationPage from './notifications/NotificationPage';
import CourseList from './courses/CourseList'
import CourseDetails from './courses/CourseDetails'
import LessonView from './courses/LessonView'
import InstructorDashboard from './instructor/InstructorDashboard'
import InstructorCourseManage from './instructor/InstructorCourseManage'
import InstructorRoute from './auth/InstructorRoute'

const ProtectedRoute = ({children})=>{
    const{user,loading} = useAuth();
    if(loading) return <p>Loading...</p>
    return user?children :<Navigate to='/login' />
  }

function App() {

  return(
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path ='/login' element={<Login/>}/>
          <Route path= '/signup' element={<Signup/>}/>
          <Route  
            index
            element={
              <ProtectedRoute>
                <Profile/>
                <NotificationBell />
              </ProtectedRoute>}
          />
            <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationPage/>
              </ProtectedRoute>
            }/>
            <Route
              path='/courses'
              element={
                <ProtectedRoute>
                  <CourseList/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:courseId"
              element={
                <ProtectedRoute>
                  <CourseDetails/>
                </ProtectedRoute>
              }/>
            <Route
              path="/courses/lesson/:lessonId"
              element={
                <ProtectedRoute>
                  <LessonView />
                </ProtectedRoute>
              }/>
            <Route
              path="/instructor"
              element={
                <InstructorRoute>
                  <InstructorDashboard />
                </InstructorRoute>
              }
            />
            <Route
              path="/instructor/course/:courseId"
              element={
                <InstructorRoute>
                  <InstructorCourseManage />
                </InstructorRoute>
              }
            />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
