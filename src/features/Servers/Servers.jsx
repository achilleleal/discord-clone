import React, { useState, useEffect } from 'react'

import { Avatar, IconButton } from '@material-ui/core'
import { FaPlus } from 'react-icons/fa'

import './Servers.sass'
import { useDispatch, useSelector } from 'react-redux'
import { selectServerId, setServerInfo } from '../slices/appSlice'
import db from '../../firebase/firebase'

export default function Servers() {
    
    const dispatch = useDispatch()
    const [serverList, setServerList] = useState([])

    useEffect(() => {
        db.collection('servers').onSnapshot(snapshot => {
            setServerList(snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.serverName,
                    photo: data.serverPhoto
                }
            }
            ))
        })
    }, [serverList])

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
        const serverName = prompt("Enter the server's name");
        const serverPhoto = prompt("Enter the server's image URL");
    
        if (serverName) {
            db.collection('servers').add({
                serverName,
                serverPhoto
            })
        }
    }

    return (
        <div className="servers">
            <div className="servers__list">
                {serverList.map(({ id, name, photo}) => 
                    <Avatar 
                      src={photo} 
                      onClick={() => changeServer(id, name)}
                      title={name}
                      key={id}
                    />)}
            </div>
            
            <footer className="servers__addServer">
                <IconButton onClick={createServer} title="Add a server">
                    <FaPlus />
                </IconButton>
            </footer>
        </div>
    )
}
