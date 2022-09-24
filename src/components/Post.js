import React, { useEffect, useState } from 'react'
import { database } from '../firebase'
import './feeds.css'
import Video from './Video'
import CircularProgress from '@mui/material/CircularProgress';
import Like from './Like';
import Avatar from '@mui/material/Avatar';

function Post({ userData }) {

    const [posts, setposts] = useState(null)
    const [likelength, setlike] = useState(0)

    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {

            parr = []
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                parr.push(data)
            })
            setposts(parr)
            // let length = parr.length;
            // setlike(length);
        })
        return unsub;
    }, [])
    // console.log(posts)

    return (
        <div className='postholder' >
            {
                posts == null || userData == null ?
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
                                                <div style={{ display: 'flex', alignItems: 'center' }} >
                                                    <Like userData={userData} postData={post} />
                                                    <h6 className='aname' > {post.likes.length}  </h6>
                                                </div>
                                            </div>
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