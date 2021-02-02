import React from 'react'

import { IoMdNotifications, IoMdNotificationsOff, IoMdSend } from 'react-icons/io'
import { IoLocationSharp, IoPeopleSharp } from 'react-icons/io5'
import { FaSearch } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";

import './ChatHeader.sass'

export default function ChatHeader({ channelName }) {
    return (
        <header className="chatHeader">
            <div className="chatHeader__left">
                <h3>
                    <span className="chatHeader__hash">#</span>
                    {channelName}
                </h3>
            </div>
            <div className="chatHeader__right">
                <IoMdNotifications />
                <IoLocationSharp />
                <IoPeopleSharp />

                <div className="chatHeader__search">
                    <input type="text" placeholder="Search"/>
                    <FaSearch />
                </div>

                <IoMdSend />
                <FiHelpCircle />
            </div>
        </header>
    )
}
