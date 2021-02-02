import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { auth, provider } from '../../firebase/firebase.js'
import './Login.sass'

export default function Login() {

    const [error, setError] = useState(false)

    const signIn = () => {
        setError(false)
        auth.signInWithPopup(provider)
        .catch(err => {
            setError(true);
            console.log(err);
        });
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://discord.com/assets/fc0b01fe10a0b8c602fb0106d8189d9b.png" alt=""/>
            </div>
            {error && <h1>There was an error loggin in. Please try again</h1>}
            <Button onClick={signIn}>
                Sign in
            </Button>
        </div>
    )
}
