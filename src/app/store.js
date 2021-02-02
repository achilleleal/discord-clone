import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/slices/userSlice';
import appReducer from '../features/slices/appSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer
  },
});
