import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./NoUser.styles.css"
const NoUser = () => {
    const navigate = useNavigate();
    
  return (
    <div className="noUserContainer">
        <div className="noUserSmallContainer">
            <h1>Please login/sign up!</h1>
            <Button size="large" variant="contained" onClick={()=> navigate("/")}>Back</Button>
        </div>
    </div>
  )
}

export default NoUser