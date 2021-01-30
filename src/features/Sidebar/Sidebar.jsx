import React from 'react'

import { MdExpandMore, MdSignalCellular4Bar, MdCall, MdSettings } from "react-icons/md"
import { RiAddFill, RiHeadphoneFill, RiHeadphoneLine } from "react-icons/ri"
import { AiOutlineInfoCircle, AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai"

import { Avatar } from '@material-ui/core'

import SidebarChannel from './SidebarChannel'
import './Sidebar.sass'

export default function Sidebar() {
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

                    <RiAddFill className="sidebar__addChannel"/>
                </header>

                <div className="sidebar__channelsList">
                    <SidebarChannel/>
                    <SidebarChannel/>
                    <SidebarChannel/>
                    <SidebarChannel/>
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
                <Avatar src={'https://i.pinimg.com/originals/98/c0/83/98c08367933f07c451a18c4507f011a5.jpg'}/>
                <div className="sidebar__profileInfo">
                    <h3>Achille</h3>
                    <p>#myId</p>
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

