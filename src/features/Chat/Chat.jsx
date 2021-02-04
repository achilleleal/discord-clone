import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName, selectServerId } from '../slices/appSlice';
import { selectUser } from '../slices/userSlice';

import db from '../../firebase/firebase';
import firebase from 'firebase'

import { MdAddCircle } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";
import { IoArrowDownCircle } from 'react-icons/io5';

import ChatHeader from './ChatHeader'
import Message from './Message'
import './Chat.sass'

export default function Chat() {

    const serverId = useSelector(selectServerId)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)

    const user = useSelector(selectUser)

    const [input, setInput] = useState('') // Chat input
    const [messages, setMessages] = useState([])

    // Reference to access the db
    const messagesRef = () => db.collection('servers')
                                .doc(serverId)
                                .collection("channels")
                                .doc(channelId)
                                .collection("messages");

    // Change page title 
    useEffect(() => {
        document.title = `${channelName ? `#${channelName}` : 'Menu'} - Discord Clone`
    }, [channelName])

    // Scroll to bottom of chat (newer messages)
    const chat = document.querySelector('.chat__messages');
    const scrollToBottom = () => chat.scrollTop = chat.scrollHeight; 

    // Get server messages
    useEffect(() => {
        if (channelId) {
            messagesRef()
              .orderBy('timestamp', 'asc')
              .onSnapshot(snapshot => 
                setMessages(snapshot.docs.map(doc => doc.data()))
              )
        }
    }, [channelId])

    // Clear server messages
    useEffect(() => {
        setMessages([])
    }, [serverId])


    const sendMessage = (e) => {
        e.preventDefault();
        messagesRef()
          .add({
            message: input,
            user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(scrollToBottom)
        setInput("")
    }

    const handleNoMessages = () => {
        if (channelId) return (
            <>
                <h3>There are no messages in this channel yet</h3>
                <p>Be the first one to send a message!</p>
            </>
        )
        // else
        return (
            <>
                <h3>You aren't inside a channel yet</h3>
                <p>Enter one in the sidebar to the left to start talking</p>
            </>
        )
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>
            <div className={`chat__messages ${!messages.length ? "chat__empty" : "" }`}>
                {messages.length 
                    ?
                    messages.map(({ user, timestamp, message }) => 
                        <Message 
                        key={`${channelId}_${user}_${timestamp}_${Math.random() * 1000}`}
                        user={user}
                        timestamp={timestamp}
                        message={message}
                        />
                    )

                    : 
                    <div>
                        {handleNoMessages()}
                    </div>
                }
            </div>

            <IoArrowDownCircle 
              onClick={scrollToBottom} 
              className="chat__toBottomBtn" 
              title="Scroll to bottom"
            />
            
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
