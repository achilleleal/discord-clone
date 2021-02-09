import React from 'react'

import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'
import { selectServerId, selectServerName } from '../slices/appSlice'
import db, { auth } from '../../firebase/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'

import { MdExpandMore, MdSignalCellular4Bar, MdCall } from "react-icons/md"
import { RiAddFill, RiHeadphoneFill } from "react-icons/ri"
import { AiOutlineInfoCircle, AiFillAudio } from "react-icons/ai"
import { BiLogOut } from 'react-icons/bi'

import { Avatar, CircularProgress } from '@material-ui/core'

import Servers from '../Servers'
import SidebarChannel from './SidebarChannel'
import './Sidebar.sass'

export default function Sidebar() {

    const user = useSelector(selectUser);

    const serverId = useSelector(selectServerId)
    const serverName = useSelector(selectServerName)

    // Reference to access the db
    const channelsRef = serverId ? db.collection('servers').doc(serverId).collection('channels') : null;

    const [channels, loading, error] = useCollection(channelsRef);

    const handleAddChannel = () => {
        if (serverId) {
            const channelName = prompt("Enter a channel name");

            if (channelName) {
                channelsRef.add({
                    channelName,
                })
            }
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

                <div className={`sidebar__channelsList ${(!channels?.docs.length || loading || error) ? 'sidebar__channelsMessage' : ''}`}>
                    { error 
                        ? <h4>There was an error, please try again</h4>

                        : channels?.docs.length
                            ?   (channels.docs.map((doc) => 
                                    <SidebarChannel 
                                    key={doc.id}
                                    id={doc.id}
                                    channelName={doc.data().channelName}
                                    channelsRef={channelsRef}
                                    />
                                ))

                            : loading
                                ?   <>
                                        <h4>Loading...</h4>
                                        <CircularProgress />
                                    </> 
                                :   <>
                                        <h4>There aren't any channels yet.</h4>
                                        <p>Create one with the plus button above!</p>
                                    </>
                    }
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

