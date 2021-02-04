import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'
import { selectServerId, selectServerName } from '../slices/appSlice'
import db, { auth } from '../../firebase/firebase'

import { MdExpandMore, MdSignalCellular4Bar, MdCall } from "react-icons/md"
import { RiAddFill, RiHeadphoneFill } from "react-icons/ri"
import { AiOutlineInfoCircle, AiFillAudio } from "react-icons/ai"
import { BiLogOut } from 'react-icons/bi'

import { Avatar } from '@material-ui/core'

import Servers from '../Servers'
import SidebarChannel from './SidebarChannel'
import './Sidebar.sass'

export default function Sidebar() {

    const user = useSelector(selectUser);

    const serverId = useSelector(selectServerId)
    const serverName = useSelector(selectServerName)

    const [channels, setChannels] = useState([]);

    // Reference to access the db
    const channelsRef = () => db.collection('servers').doc(serverId).collection('channels');

    // Get server channels
    useEffect(() => {
        if (serverId) {
            setChannels([])
            console.log(`Getting channels for ${serverName}`);
            channelsRef().onSnapshot(snapshot => {
                setChannels(snapshot.docs.map(doc => ({
                    id: doc.id,
                    channel: doc.data(),
                })))
            })
        }
    }, [serverId])

    const handleAddChannel = () => {
        const channelName = prompt("Enter a channel name");

        if (channelName) {
            channelsRef().add({
                channelName,
            })
        }
    }

    return (
    <div className="sidebar">
        <Servers />
        <div className="sidebar__right">
            <header className="sidebar__top">
                <h3>{serverName}</h3>
                <MdExpandMore />
            </header>

            <div className="sidebar__channels">
                <header className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <MdExpandMore />
                        <h4>Text Channels</h4>
                    </div>

                    <RiAddFill onClick={handleAddChannel} className="sidebar__addChannel" title="Create a channel"/>
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
                <Avatar src={user.photo} title="You!"/>
                <div className="sidebar__profileInfo" title="You!">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0,5)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <AiFillAudio title="Mute"/>
                    <RiHeadphoneFill title="Deafen"/>
                    <BiLogOut onClick={() => auth.signOut()} title="Log out"/>
                </div>
            </div>
        </div>
    </div>
    )
}

