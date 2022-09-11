import React, { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'
import { auth } from '../firebase'
import { useNavigate} from 'react-router-dom'

function Feed() {
  const {logout} = useContext(AuthContext)
  const navigate = useNavigate()
  const handlelogout = async()=>{
    
    try {
      const out = await logout()    
      
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <div>Welcome to the feeds of reels</div>
    <button onClick={()=>handlelogout()} > Logout </button>
    </>
  )
}

export default Feed