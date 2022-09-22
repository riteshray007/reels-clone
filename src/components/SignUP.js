import React, { useState,useEffect , useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { database , storage } from '../firebase';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Instalogo2 from '../Assets/Instagram_logo.svg.png';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createUseStyles } from 'react-jss';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import './signup.css'
import { Link , useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import {ref ,getStorage, uploadBytesResumable , getDownloadURL , uploadString } from 'firebase/storage'
// import { create } from '@mui/material/styles/createTransitions';




// import Button from '@mui/material/Button';
// import { margin } from '@mui/system';

export default function SignUP() {

    // let uid;
    const {signup} = useContext(AuthContext)
    //destructure
    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [password, setpass] = useState('')
    const [error , setError] = useState('')
    const [file , setfile] = useState(null)
    const [name , setname] = useState('')
    const [ loading , setLoading ] = useState(false)
    // const [user, setuser] = useState('')


    const handleclick = async ()=>{
        // console.log(email)
        // console.log(password)
        // console.log(name)
        // console.log(file)
  
        try {
          setLoading(true)
          const userInfo = await signup(email , password)
          console.log(userInfo)
          let uid =  userInfo.user.uid
          
  
          const storageRef = ref(storage , `${userInfo.user.uid}/Profile`)
          const uploadTask = uploadBytesResumable(storageRef , file )
   
          uploadTask.on('state_changed' , (snapshot)=>{
            const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            console.log(error);
          }, ()=>{
                     getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
                      database.users.doc(uid).set({
                        email:email,
                        userId:uid,
                        fullname:name,
                        profileUrl:downloadURL,
                        createdAt:database.getTimestamp(),
                        password : password
                    })
                     })
          })
  
  
          navigate('/feed')
        } catch (error) {
          console.log(error)
        } 
   }
       
    const useStyles = createUseStyles({
        text1: {
            color: 'gray',
            fontSize: 'small',
        },
        text2: {
            fontSize: 'small',
            marginTop: '0vh',
        },
        text3: {
            fontSize: 'small',
            fontWeight: '10px'
        },
        text4: {
            fontSize: 'small',
            marginTop: '1vh'
        },
        button1: {
            marginTop: '0vh',
            marginBottom: '3vh'
        }
    })
    const classes = useStyles()

    return (
        <div className='signupwrapper' >
            <div className='signupcard' >
                <Card sx={{ maxWidth: 345 }}>

                    <img alt='...' className='instalogo' src={Instalogo2} style={{ width: '70%', marginTop: '4vh', height: '10%' }} />

                    <Typography className={classes.text1} >
                        Sign up to see photos and videos from your friends
                    </Typography>
                    <Button variant="contained" className='faceb' style={{ textTransform: 'none', marginTop: '1.2vh', marginBottom: '1vh' }}> 
                    <FontAwesomeIcon className='facebookicon'
                        style={{ width: '18px' }} icon={faFacebook} ></FontAwesomeIcon> Log in With facebook</Button>
                    <TextField value={email} onChange={(e)=>setemail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" style={{ width: '90%' }} fullWidth={true} margin='dense' size='small' />
                    <TextField  value={password} onChange={(e)=>setpass(e.target.value)} id="outlined-password-input"   label="Password" type="password" autoComplete="current-password" style={{ width: '90%' }} fullWidth={true} margin='dense' size='small' />
                    <TextField value={name} onChange={(e)=>setname(e.target.value)} id="outlined-basic" label="Full Name" variant="outlined" style={{ width: '90%' }} fullWidth={true} margin='dense' size='small' />
                    <Button style={{ width: '90%', textTransform: 'none', fontFamily: 'Oswald , sans-serif', fontWeight: '30px' }} color="secondary" component='label' >
                        <input type='file' accept='image/*' hidden onChange={(e)=>setfile(e.target.files[0])}  />
                        upload profile picture  </Button>
                    <CardContent>
                        {error!='' && <Alert severity="error">This is an error alert — check it out!</Alert>}
                    </CardContent>
                    <Typography className={classes.text2} >
                        People who use our service may have uploaded your contact information to Instagram. <Box sx={{
                            display: 'inline',
                            fontWeight: '700',
                        }}>
                            Learn more.
                        </Box>
                    </Typography>
                    <Typography paragraph={true} className={classes.text4} >
                        By signing up, you agree to our <Box sx={{
                            display: 'inline',
                            fontWeight: '700',
                        }}>
                            Terms, Privacy Policy
                        </Box> and <Box sx={{
                            display: 'inline',
                            fontWeight: '700',
                        }}>
                            Cookies Policy.
                        </Box>
                    </Typography>
                    <Button  onClick={()=>handleclick()} className={classes.button1} style={{ width: '90%', height: '30px', textTransform: 'none', marginBottom: '2.5rem' }}  variant="contained">Sign Up</Button>
                    
                   {/* { user == null? <div> </div> : <Button onClick={() => logout()} className={classes.button1} style={{ width: '90%', height: '30px', textTransform: 'none', marginBottom: '2.5rem' }} variant="contained">Log out</Button>
                   } */}
                </Card>
            </div>
            <div className='secdiv' >

                <Card className='secondcard' sx={{ maxWidth: 345 }} >

                    <Typography sx={{ fontSize: '15px' }} >Have an account?<Button vareint='text' sx={{ padding: '0rem', margin: '0px', textTransform: 'none' }} > <Link to='/login' style={{ textDecoration: 'none' }}> Log in </Link>  </Button></Typography>
                </Card>
            </div>
        </div>
    );
}
