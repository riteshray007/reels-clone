import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import UploadFile from './UploadFile'
import './feeds.css'


function Feed() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const handlelogout = async () => {

    try {
      const out = await logout()

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='feedswrapper'>
      <div>

        <div className='header' >Welcome to the reels</div>
        {/* <button onClick={() => handlelogout()} > Logout </button> */}
      </div>

      <div className='uploadb' >

        <UploadFile />
      </div>
    </div>
  )
}

export default Feed