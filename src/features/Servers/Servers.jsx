import React from 'react'

import { Avatar, IconButton } from '@material-ui/core'
import { FaPlus } from 'react-icons/fa'

import './Servers.sass'
import { useDispatch, useSelector } from 'react-redux'
import { selectServerId, setServerInfo } from '../slices/appSlice'
import db from '../../firebase/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'

export default function Servers() {
    
    const dispatch = useDispatch()
    const [serverList, loading, error] = useCollection(db.collection('servers'))

    const currentServerId = useSelector(selectServerId);
    const changeServer = (id, name) => {
        if (currentServerId !==id)
        dispatch(
            setServerInfo({
                serverId: id,
                serverName: name
            })
        )
    }

    const createServer = () => {
        const serverName = prompt("Enter the server's name (required)");
        if (serverName) {
            const serverPhoto = prompt("Enter the server's image URL (required)");
        
            if (serverPhoto) {
                db.collection('servers').add({
                    serverName,
                    serverPhoto
                })
            }
        }
        
    }

    return (
        <div className="servers">
            <div className="servers__list">
                {serverList?.docs.map(doc => {
                    const { serverPhoto, serverName } = doc.data();
                    const { id } = doc;
                    return <Avatar 
                      src={serverPhoto} 
                      onClick={() => changeServer(id, serverName)}
                      title={serverName}
                      key={id}
                    />
                })}
            </div>
            
            <footer className="servers__addServer">
                <IconButton onClick={createServer} title="Add a server">
                    <FaPlus />
                </IconButton>
            </footer>
        </div>
    )
}
