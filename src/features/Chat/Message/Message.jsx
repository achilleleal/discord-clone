import React from 'react'
import { Avatar } from '@material-ui/core'
import './Message.sass'

export default function Message() {
    return (
        <div className="message">
            <Avatar />
            <div className="message__info">
                <h4>
                    Achille 
                    <span className="message__timestamp">
                        This is a timestamp
                    </span>
                </h4>
                <p>This is a message</p>
            </div>
        </div>
    )
}
