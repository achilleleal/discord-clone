import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'

import { MdExpandMore, MdSignalCellular4Bar, MdCall, MdSettings } from "react-icons/md"
import { RiAddFill, RiHeadphoneFill, RiHeadphoneLine } from "react-icons/ri"
import { AiOutlineInfoCircle, AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai"

import { Avatar } from '@material-ui/core'

import SidebarChannel from './SidebarChannel'
import './Sidebar.sass'
import db, { auth } from '../../firebase/firebase'

export default function Sidebar() {

    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => {
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data(),
            })))
        })
        console.log(channels);
    }, [])

    const handleAddChannel = () => {
        const channelName = prompt("Enter a channel name");

        if (channelName) {
            db.collection('channels').add({
                channelName,
            })
        }
    }

    return (
        <div className="sidebar">
            <header className="sidebar__top">
                <h3>Server #1</h3>
                <MdExpandMore />
            </header>

            <div className="sidebar__channels">
                <header className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <MdExpandMore />
                        <h4>Text Channels</h4>
                    </div>

                    <RiAddFill onClick={handleAddChannel} className="sidebar__addChannel"/>
                </header>

                <div className="sidebar__channelsList">
                    {channels.map(({ id, channel }) => 
                        <SidebarChannel 
                          key={id}
                          id={id}
                          channelName={channel.channelName}
                        />
                    )}
                </div>
            </div>

            <div className="sidebar__voice">
                <MdSignalCellular4Bar
                    className="sidebar__voiceIcon"
                />

                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar__voiceIcons">
                    <MdCall />
                    <AiOutlineInfoCircle />
                </div>
            </div>

            <div className="sidebar__profile">
                <Avatar onClick={() => auth.signOut()} src={user.photo}/>
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0,5)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <AiFillAudio />
                    <RiHeadphoneFill />
                    <MdSettings />
                </div>
            </div>

        </div>
    )
}

