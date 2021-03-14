import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import firebaseConfig from './firebaseConfig'

firebase.initializeApp(firebaseConfig)


const db = firebase.firestore()

export const auth = firebase.auth()

export const provider = new firebase.auth.GoogleAuthProvider()

export default db