import React, { useState , useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import './feeds.css';
import { database } from '../firebase';


function Like({userData  , postData }) {

    const [like , setlike ] = useState(false)
    
    useEffect(() =>{
        let check = postData.likes.includes(userData.userId)?true : false
        setlike(check);
    },[postData])

    const handlelike=()=>{
        if(like === true ){
            let newarr = postData.likes.filter((n)=> n!==userData.userId )
            database.posts.doc(postData.postId).update({
                likes:newarr
            })
        }
        else{
            let newarr = [...postData.likes , userData.userId]
            database.posts.doc(postData.postId).update({
                likes:newarr
            })
        }
    }

  return (
    <div className='like-btn' >
        {
            like!=null?
            <>
                {
                    like===true ? <FavoriteIcon className='likeicon like' colour="primary"  onClick={()=>handlelike()}  /> : < FavoriteIcon className='likeicon unlike' onClick={()=>handlelike()}  />
                }
            </>:
            <></>
        }
    </div>
  )
}

export default Like