import React from 'react'

import { MdAddCircle } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";

import ChatHeader from './ChatHeader'
import Message from './Message'
import './Chat.sass'

export default function Chat() {
    return (
        <div className="chat">
            <ChatHeader />
            <div className="chat__messages">
                <Message />
                <Message />
                <Message />
                <Message />
            </div>
            <div className="chat__input">
                <MdAddCircle />
                <form>
                    <input placeholder={`Message #Test Channel`}/>
                    <button className="chat__inputBtn" type="submit">
                        Send Message
                    </button>
                </form>
                <div className="chat__inputIcons">
                    <AiFillGift />
                    <AiOutlineGif />
                    <HiOutlineEmojiHappy />
                </div>
            </div>
        </div>
    )
}
