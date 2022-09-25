import React, { useEffect, useState } from 'react'
import { database } from '../firebase'
import './feeds.css'
import Video from './Video'
import CircularProgress from '@mui/material/CircularProgress';
import Like from './Like';
import Avatar from '@mui/material/Avatar';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Comment from './Comment';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Addcomement from './Addcomement';

function Post({ userData }) {

    const [posts, setposts] = useState(null)
    const [open, setopen] = useState(null)


    const handleopen = (id) => {
        setopen(id)
    }

    const handleclose = () => {
        setopen(null)
    }


    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {

            parr = []
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                parr.push(data)
            })
            setposts(parr)

        })
        return unsub;
    }, [])
    // console.log(posts)

    return (
        <div className='postholder' >
            {posts == null || userData == null ?
                <CircularProgress /> :
                <div className='video-container' >
                    {
                        posts.map((post, index) => {
                            return (
                                <React.Fragment key={index} >
                                    <div className='videos' >
                                        <Video src={post.pUrl} id={post.pId} />
                                        <div className='avatardiv' >
                                            <Avatar className='avatar' sizes=' 5rem ' src={post.uProfile} />
                                            <p className='aname' >{post.uName}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', }} >
                                                <Like userData={userData} postData={post} />
                                                <h6 className='likescount' > {post.likes.length}  </h6>
                                            </div>
                                            <ChatBubbleOutlineIcon className='chat-styling' onClick={() => handleopen(post.pId)} />
                                        </div>
                                        <Dialog
                                            open={open == post.pId}
                                            onClose={handleclose}
                                            aria-labelledby='alert-dialog-title'
                                            aria-describedby='alert-dialog-description'
                                            fullWidth={true}
                                            maxWidth='md'
                                        >
                                            <div className='model-container' >

                                                <div className='video-model'>

                                                    <video autoPlay={true} muted='muted' controls >
                                                        <source src={post.pUrl} />
                                                    </video>
                                                </div>
                                                <div class="cards" style={{ background: 'red', width: '50%', height: '100%' }}>

                                                    <Card className='commentcard1' style={{ maxHeight: '65vh', overflowY: 'scroll' }} userData={userData} postData={post} >

                                                        <Comment userData={userData} postData={post} />

                                                    </Card>
                                                    <Card>
                                                        <Addcomement userData={userData} postData={post} />

                                                    </Card>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Post