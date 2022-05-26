import { useAuth } from "../../firebase-context/AuthContext";
import { Navigate } from "react-router-dom";
import React from 'react'

function RequireAuth({children}) {

    
  const {userData} = useAuth();

  return userData && userData.roles === 1001 ? children : <Navigate to="/login-page"/>
}

export default RequireAuth
