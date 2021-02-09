import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
      serverId: null,
      serverName: null,
      currentChannel: {
        channelId: null,
        channelName: null
      }
  },
  reducers: {
    setServerInfo: (state, action) => ({
      ...state,
      serverId: action.payload.serverId,
      serverName: action.payload.serverName,
    }),
    setChannelInfo: (state, action) => ({
      ...state,
      currentChannel: {
        channelId: action.payload.channelId,
        channelName: action.payload.channelName
      }
    }),
  },
});

export const { setServerInfo, setChannelInfo } = appSlice.actions;

export const selectServerId = state => state.app.serverId;
export const selectServerName = state => state.app.serverName;
export const selectChannelId = state => state.app.currentChannel?.channelId;
export const selectChannelName = state => state.app.currentChannel?.channelName;

export default appSlice.reducer;
