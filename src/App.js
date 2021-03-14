import React, { useEffect, Suspense } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login, logout } from './features/slices/userSlice'

import './App.css';
import { auth } from './firebase/firebase';
import { CircularProgress } from '@material-ui/core'

import ErrorBoundary from './features/ErrorBoundary';
import Login from './features/Login';
const Sidebar = React.lazy(() => import('./features/Sidebar')) 
const Chat =  React.lazy(() => import('./features/Chat'))

const loadFallback = <div className="fallback"><CircularProgress /></div>

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
    <ErrorBoundary>
      <div className="app">
        {user 
          ?
            <Suspense fallback={loadFallback}>
              <Sidebar />
              <Chat />
            </Suspense>
          : <Login />
        }  
      </div>
    </ErrorBoundary>
  );
}

export default App;
