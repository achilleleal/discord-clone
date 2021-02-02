import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login, logout } from './features/slices/userSlice'

import Sidebar from './features/Sidebar'
import Chat from './features/Chat'
import Login from './features/Login/Login';
import './App.css';
import { auth } from './firebase/firebase';

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // the user is logged in
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        // the user is logged out
        dispatch(logout())
      }
    })
  }, [dispatch])

  return (
    <div className="app">
      {user 
        ?
          <>
            <Sidebar />
            <Chat />
          </>
        : <Login />
      }  
    </div>
  );
}

export default App;
