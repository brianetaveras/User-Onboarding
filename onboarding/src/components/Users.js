import React from 'react'

export default function Users(props){
    return (
        <div className="user-container">
<p>{props.user.name}</p>
<p>{props.user.email}</p>
        </div>
    )

}