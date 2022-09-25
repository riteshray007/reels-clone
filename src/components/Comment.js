import React from 'react'

function Comment({ postData , userData }) {
    return (
        <div className='comments'  >
            <p> Comment viewing section </p>
            <p> posted by - {postData.uName} </p>
            <p> posted by - {postData.userId} </p>
            <p> posted by - {postData.userId} </p>
            <p> posted by - {postData.userId} </p>
            <p> posted by - {postData.userId} </p>
            <p> posted by - {postData.userId} </p>
            <p> posted by - {postData.userId} </p>
            <p> posted by - {postData.userId} </p>
            <p> posted by - {postData.userId} </p>
            <p> posted by - {postData.userId} </p>
            <p> posted by - {postData.userId} </p>
            <p> posted by - {postData.userId} </p>
            <p> posted by - {postData.userId} </p>
        </div>
    )
}

export default Comment