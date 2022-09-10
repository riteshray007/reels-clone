import React,{useEffect , useState} from 'react';
import {auth} from '../firebase' 
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import {AuthContext} from '../context/AuthContext'
import { useContext } from 'react';



import Instalogo2 from '../Assets/Instagram_logo.svg.png';
import insta from '../Assets/insta.png';
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';


import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createUseStyles } from 'react-jss';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import {Link} from 'react-router-dom'
 import './login.css';


// import { margin } from '@mui/system';

export default function Login() {

    const test = useContext(AuthContext)
    // console.log(test)


    const useStyles = createUseStyles({
        text1: {
            color: 'gray',
            fontSize: 'small',
        },
        text2: {
            fontSize: 'small',
            marginTop: '0vh',
            color: '#00376b',
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
            marginBottom: '0vh'
        }
    })
    const classes = useStyles()
 
    const [email , setemail] = useState('')
    const [password , setpass] = useState('')
    const [error , setError] = useState('')
    
    // const login= async ()=>{
    //     await auth.signInWithEmailAndPassword(email , password)
    // }

    // useEffect(() =>{
    //     let usersub = auth.onAuthStateChanged((user)=> {setuser(user)});

    //     return ()=>{
    //         usersub(); 
    //     };
    // },[]  )

    // const logout = async() =>{
    //     await auth.signOut();
    // }

    return (

        <div className='signup-page'>

            <div className='img-car' style={{ background: 'url(' + insta + ')' , backgroundSize:'cover' }  } >

                <div className='car' >

                    <CarouselProvider
                        visibleSlides={1}
                        totalSlides={5}
                        // step={3}
                        naturalSlideWidth={239}
                        naturalSlideHeight={423}
                        hasMasterSpinner
                        isPlaying={true}
                        infinite={true}
                        dragEnabled={false}
                        touchEnabled={false}
                        interval={2000}
                    >
                        <Slider>
                            <Slide index={0}> <Image src={img1} alt='...' />  </Slide>
                            <Slide index={1}> <Image src={img2} alt='...'/>  </Slide>
                            <Slide index={2}> <Image src={img3} alt='...'/>  </Slide>
                            <Slide index={3}> <Image src={img4} alt='...'/>  </Slide>
                            <Slide index={4}> <Image src={img5} alt='...'/>  </Slide>

                        </Slider>
                    </CarouselProvider>

                </div>

            </div>




            <div className='signupwrapper'  >
                <div className='signupcard' >

                    <Card sx={{ maxWidth: 345 }}>
                        <div>
                            <img alt='...' className='instalogo' src={Instalogo2} style={{ width: '70%', marginTop: '4vh', height: '10%' }} />
                        </div>

                        <TextField id="outlined-basic" value={email} onChange={(e)=>setemail(e.target.value)}  label="Email" variant="outlined" style={{ width: '80%' }} fullWidth={true} margin='dense' size='small' />
                        <TextField id="outlined-password-input" value={password} onChange={(e)=>setpass(e.target.value)} label="Password" type="password" autoComplete="current-password"   style={{ width: '80%' }} fullWidth={true} margin='dense' size='small' />

                        <Button  className={classes.button1} style={{ width: '80%', marginTop: '1.2vh', textTransform: 'none' }} variant="contained">Log in </Button>
                        <h4>

                        
                            <span>OR</span>
                        </h4>
                        <Button variant="text" style={{ textTransform: 'none', marginTop: '0.1vh', marginBottom: '0vh', }}> <FontAwesomeIcon className='facebookicon'
                            icon={faFacebook} ></FontAwesomeIcon> Log In With Facebook</Button>
                        <CardContent style={{ marginTop: '0vh' }} >
                            {error!='' && <Alert severity="error">This is an error alert — check it out!</Alert>}
                        </CardContent>
                        <Button style={{ marginBottom: '2.5vh', textTransform: 'none', }}> <Typography className={classes.text2}   >
                            Forgotten your password?
                        </Typography></Button>


                    </Card>
                </div>
                <div className='secard' >

                    <Card className='secondcard' sx={{ maxWidth: 345, }} >

                    {/* { user == null? <div> </div> : <Button className={classes.button1} style={{ width: '90%', height: '30px', textTransform: 'none', marginBottom: '2.5rem' }} variant="contained">Log out</Button>
                   } */}
                        <Typography sx={{ fontSize: '15px' }} >Don't have an account?
                            <Button vareint='text' sx={{ padding: '0rem', textTransform: 'none' }} > <Link to='/' style={{textDecoration:'none'}} > Sign up </Link></Button>
                        </Typography>
                    </Card>
                </div>
            </div>

        </div>
    );
}
// npm i pure-react-carousel