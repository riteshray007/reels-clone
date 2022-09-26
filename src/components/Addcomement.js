import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { database } from '../firebase'


function Addcomement({ userData, postData }) {

    const [comment, setcomment] = useState('')

    const handleClick = () => {
        let obj = {
            comment: comment,
            uProfileImage: userData.profileUrl,
            uName: userData.fullname
        }
        database.comments.add(obj).then((doc) => {
            database.posts.doc(postData.postId).update({
                comments: [...postData.comments , doc.id]
            })
        })
        setcomment('')
    }
    return (
        <div className='addcommentwrapper' >

            <TextField
                onChange={(e) => setcomment(e.target.value) }
                value={comment}
                autocomplete="off"
                id='outlined-basic'
                label=' write a comment'
                varient='outlined' size='small'
                sx={{ width: '70%', margin: '0.5rem' }} />
            <Button onClick={handleClick}
                varient='contained' size='small'
                style={{
                    textTransform: 'none',
                    margin: '0rem', width: '30%',
                    marginRight: '0.2rem'
                }} >Post Comment</Button>
            {/* <p>{comment}</p> */}
        </div>
    )
}

export default Addcomement