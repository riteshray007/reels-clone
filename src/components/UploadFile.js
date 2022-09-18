import { Button } from '@mui/material'
import React, { useState } from 'react'
import './feeds.css'
import MovieCreationTwoToneIcon from '@mui/icons-material/MovieCreationTwoTone';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { createUseStyles } from 'react-jss';
import { database, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export default function UploadFile() {
  const [loading, setloading] = useState(false)
  const [error, setError] = useState('')

  const handlechange = async (file) => {
    if (file == null) {
      setError('please Select a file ')
      setTimeout(() => { 
        setError('')
      }, 20000)
      return;
    }
    if (file.size / (1024 * 1024) > 100) {
      setError('this video is very large to upload')
      setTimeout(() => {
        setError('')
      }, 2000);
      return;
    }

    let uid = uuidv4()
    setloading(true)

    const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
    uploadTask.on("state_changed" , fn1)

    function fn1(snapshot){
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      console.log(`upload is ${progress}% done`)
    }
    setloading(false)
 
  }



  // const useStyles = createUseStyles({ 
  //   error1: {
  //     width: '70%',
  //   }
  // })
  // const classes = useStyles()

  return (


    <div className='uploadwrapper' >


      <Button variant="outlined" component='label' onChange={(e) => handlechange(e.target.files[0])}  >
        <input type='file' accept='video/*' hidden />
        <MovieCreationTwoToneIcon /> &nbsp; UPLOAD VIDEO
      </Button>

      <CardContent  >
        {error !== '' && <Alert severity="error">This is an error alert — {error} </Alert>}
      </CardContent>

      {loading && <LinearProgress style={{ width: '90%' }} />}







    </div>
  )
}
