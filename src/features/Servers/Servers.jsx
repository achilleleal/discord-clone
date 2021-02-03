import React from 'react'

import { Avatar, IconButton } from '@material-ui/core'
import { FaPlus } from 'react-icons/fa'

import './Servers.sass'

export default function Servers() {

    const serverList = [
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
        <Avatar />,
    ]

    return (
        <div className="servers">
            <div className="servers__list">
                {serverList.map(server => <Avatar src='' onClick='' title={server.name}/>)}
            </div>
            
            <footer className="servers__addServer">
                <IconButton title="Add a server">
                    <FaPlus />
                </IconButton>
            </footer>
        </div>
    )
}
