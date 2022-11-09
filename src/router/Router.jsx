import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import HomePage from '../pages/home/HomePage'

const Router = () => {
  const { user } = useSelector(store => store.users)
  return (
    <Routes>
      <Route path='/' element={user ? <HomePage /> : <Navigate to={"/login"} replace />} />
      <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} replace />} />
      <Route path='/register' element={!user ? <RegisterPage /> : <Navigate to={"/"} replace />} />
      <Route path='/verify-account/:verifyToken' element={<Navigate to={"/"} replace />} />
    </Routes>
  )
}

export default Router