import firebase from 'firebase'
import firebaseConfig from './firebaseConfig'

firebase.initializeApp(firebaseConfig)


const db = firebase.firestore()

export const auth = firebase.auth()

export const provider = new firebase.auth.GoogleAuthProvider()

export default db