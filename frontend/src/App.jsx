import { useState } from 'react'
import { AuthContextProvider, useAuth } from './auth/authContext'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Profile } from './pages/Profile'
import NotificationBell from './notifications/NotificationBell';
import NotificationPage from './notifications/NotificationPage';

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
            }
/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
