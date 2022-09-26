import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
// import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import UploadFile from './UploadFile'
import './feeds.css'
import { database } from '../firebase'
import Post from './Post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCompass } from '@fortawesome/free-solid-svg-icons'
import navlogo from '../Assets/5a4e9e5b232b9ff0848852b19665cf59-removebg-preview.png'
import Avatar from '@mui/material/Avatar'


// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';

function Feed() {

  const { logout } = useContext(AuthContext)
  // const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [userData, setUserData] = useState('')

  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data())
    })
    return () => { unsub() }
  }, [user])



  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='feedswrapper'>
      <div className='header'  >
        <img alt='...' className='nav-1st' src={navlogo} />
        <p className='nav-2nd' > {userData.fullname} </p>
        <div className='nav-3rd' >
          <FontAwesomeIcon icon={faHouse} ></FontAwesomeIcon>
          <FontAwesomeIcon icon={faCompass} ></FontAwesomeIcon>

          <div style={{ width: '2vw', height: '2vw' }}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} >
            <Avatar style={{ width: '2vw', height: '2vw', margin: '0rem' }}
              src={userData.profileUrl} >
            </Avatar>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout &nbsp;  <LogoutIcon style={{width:'1.2vw' , height:'1.2vw'}} /> </MenuItem>
          </Menu>

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