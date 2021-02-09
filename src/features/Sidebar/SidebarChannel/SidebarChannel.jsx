import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectChannelId, setChannelInfo } from '../../slices/appSlice'
import './SidebarChannel.sass'
import { IoTrashOutline } from 'react-icons/io5'

export default function SidebarChannel({ id, channelName, channelsRef }) {

    const dispatch = useDispatch();
    const currentChannelId = useSelector(selectChannelId);

    const changeChannel = () => {
        if (currentChannelId !== id) {
            dispatch(
                setChannelInfo({
                    channelId: id,
                    channelName: channelName
                })
            )
        }
    }

    const deleteChannel = () => {
        if (currentChannelId) {
        const confirmDelete = prompt(`
            Are you sure you want to delete #${channelName} and all of it's messages? \n
            This action can't be undone. \n\n
            To delete the channel, type '${channelName}' in the box below.
        `);

            if (confirmDelete === channelName) {

                channelsRef.doc(currentChannelId).delete()
                .then(() => {
                    dispatch(
                        setChannelInfo({
                            channelId: null,
                            channelName: null
                        })
                    )
                })
                .catch((err) => { 
                    alert('There was an error deleting the channel.');
                    console.log(err);
                })
            }
        }
    }

    return (
        <div className="sidebarChannel" onClick={changeChannel}>
            <h4>
                <span className="sidebarChannel__hash">#</span>
                {channelName}
            </h4>
            <IoTrashOutline onClick={deleteChannel}/>
        </div>
    )
}
