import { useState } from 'react'
import { AuthContextProvider, useAuth } from './auth/authContext'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Profile } from './pages/Profile'
import NotificationBell from './notifications/NotificationBell';
import NotificationPage from './notifications/NotificationPage';
import CourseList from './courses/CourseList'

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
            path='/'
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
             >
            <Route
              path="/course/:courseId"
              element={
                <ProtectedRoute>
                  <CourseDetails />
                </ProtectedRoute>
              }/>
            <Route
              path="/lesson/:lessonId"
              element={
                <ProtectedRoute>
                  <LessonView />
                </ProtectedRoute>
              }/>
            </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
