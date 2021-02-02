import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../slices/appSlice';
import { selectUser } from '../slices/userSlice';

import db from '../../firebase/firebase';
import firebase from 'firebase'

import { MdAddCircle } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";

import ChatHeader from './ChatHeader'
import Message from './Message'
import './Chat.sass'

export default function Chat() {

    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const user = useSelector(selectUser)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    useEffect(() => {
        if (channelId) {
            db.collection('channels')
              .doc(channelId)
              .collection("messages")
              .orderBy('timestamp', 'asc')
              .onSnapshot(snapshot => 
                setMessages(snapshot.docs.map(doc => doc.data()))
              )
        }
    }, [channelId])


    const sendMessage = e => {
        e.preventDefault();
        db.collection('channels')
          .doc(channelId)
          .collection("messages")
          .add({
            message: input,
            user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
        setInput("")
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>
            <div className="chat__messages">
                {messages.map(({ user, timestamp, message }) => 
                    <Message 
                      user={user}
                      timestamp={timestamp}
                      message={message}
                    />
                )}
            </div>
            <div className="chat__input">
                <MdAddCircle />
                <form onSubmit={sendMessage}>
                    <input 
                      value={input} 
                      onChange={e => setInput(e.target.value)}
                      placeholder={
                        channelId 
                            ? `Message #${channelName}` 
                            : 'Enter a channel to send a message'
                        }
                      disabled={!channelId}
                    />
                    <button className="chat__inputBtn" type="submit" disabled={!channelId}>
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
