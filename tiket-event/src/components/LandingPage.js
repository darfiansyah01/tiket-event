import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function LandingPage() {

    const navigate = useNavigate();

  return (
    <div>
        <button onClick={(() => navigate('/login-page'))}>Login</button>
    </div>
  )
}

export default LandingPage