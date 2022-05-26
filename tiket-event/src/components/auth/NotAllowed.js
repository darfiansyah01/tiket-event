import React from 'react';
import {  useNavigate } from "react-router-dom";

function NotAllowed() {

    const navigate = useNavigate();

  return (
    <div>
    <button onClick={(() => navigate('/'))}>Go To Login Page</button>
    </div>
  )
}

export default NotAllowed