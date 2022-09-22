import React from 'react'
import './feeds.css'

function Video(props) {
  return (
    <div  >
        <video className='video-tab' controls src={props.src} id={props.id}  ></video>

    </div>
  )
}

export default Video