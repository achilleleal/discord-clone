import React from 'react'
import { useDispatch } from 'react-redux'
import { setChannelInfo } from '../../slices/appSlice'
import './SidebarChannel.sass'

export default function SidebarChannel({ id, channelName }) {

    const dispatch = useDispatch();

    const changeChannel = () => {
        dispatch(
            setChannelInfo({
                channelId: id,
                channelName: channelName
            })
        )
    }

    return (
        <div className="sidebarChannel" onClick={changeChannel}>
            <h4>
                <span className="sidebarChannel__hash">#</span>
                {channelName}
            </h4>
        </div>
    )
}
