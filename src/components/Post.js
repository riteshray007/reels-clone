import React, { useEffect, useState } from 'react'
import { database } from '../firebase'
import './feeds.css'
import Video from './Video'
import CircularProgress from '@mui/material/CircularProgress';

function Post({ userData }) {

    const [posts, setposts] = useState(null)

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
            {
                posts == null || userData == null ? <CircularProgress /> :
                    <div  className='video-container' >
                        {
                            posts.map((post, index) => {
                                return (

                                    <div >
                                        <Video src={post.pUrl} id={post.pId} />
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Post