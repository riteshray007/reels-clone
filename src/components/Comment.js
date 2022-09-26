import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import { database } from '../firebase'

function Comment({ postData, userData }) {

    const [comments, setcomment] = useState(null)

    async function fetchcomments() {

        let arr = []
        for (let i = 0; i < postData.comments.length; i++) {
            let data = await database.comments.doc(postData.comments[i]).get()
            arr.push(data.data())
        }
        setcomment(arr)
    }

    useEffect(() => {
        fetchcomments()
    } , [postData])


    return (
        <div className='comments'  >
            <p> Comment viewing section </p>
            <p> post of - {postData.uName} </p>
            <div>
                {comments == null ? (
                        <CircularProgress />
                    ) :
                        (
                            <>
                                {comments.map((comment, index) => (

                                        <div style={{ display: 'flex' , alignItems:'center'  }} >
                                            <Avatar src={comment.uProfileImage} />
                                            <p style={{marginLeft:'0rem'}} >
                                                &nbsp;&nbsp;
                                                <span style={{ fontWeight: 'bold' }} > {comment.uName} </span>
                                                &nbsp;&nbsp; {comment.comment}
                                            </p>
                                        </div>
                                    ))
                                }
                            </>
                        )
                }
            </div>


        </div>
    )
}

export default Comment