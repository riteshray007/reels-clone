import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import UploadFile from './UploadFile'
import './feeds.css'
import { database } from '../firebase'
import Post from './Post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {faCompass} from '@fortawesome/free-solid-svg-icons'
import navlogo from '../Assets/5a4e9e5b232b9ff0848852b19665cf59-removebg-preview.png'


function Feed() {
  const { logout } = useContext(AuthContext)
  // const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const handlelogout = async () => {
    try {
      const out = await logout()

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const { user } = useContext(AuthContext)
  const [userData, setUserData] = useState('')

  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data())
    })
    return () => { unsub() }
  }, [user])

  return (
    <div className='feedswrapper'>
      <div className='header'  >
        <img className='nav-1st' src={navlogo} />
        <p className='nav-2nd' > {userData.fullname} </p>
        <div className='nav-3rd' >
        <FontAwesomeIcon icon={faHouse} ></FontAwesomeIcon>
        <FontAwesomeIcon icon={faCompass} ></FontAwesomeIcon>
        </div>
        {/* <button onClick={() => handlelogout()} > Logout </button> */}
      </div>
      
      <div className='uploadb' >
        <UploadFile user={userData} />
      </div>
      <div className='postwrapper' >
        <Post userData={userData} />
      </div>

    </div>
  )
}

export default Feed