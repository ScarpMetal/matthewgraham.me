// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase'

// Add the Firebase products that you want to use
import 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
	apiKey: "AIzaSyCmQOg03yo5GQvLlhqjBKr_WAQM98DcOEo",
	authDomain: "matthewgraham-me.firebaseapp.com",
	databaseURL: "https://matthewgraham-me.firebaseio.com",
	projectId: "matthewgraham-me",
	storageBucket: "matthewgraham-me.appspot.com",
	messagingSenderId: "376452991752",
	appId: "1:376452991752:web:bbb649048be6817352fabd",
	measurementId: "G-RHELYPR030"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

// Auth
const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()

function getUserFromCred(cred) {
	if (!cred) {
		return Promise.resolve(null)
	}
	return db.collection('users').doc(cred.uid).get().then(doc => doc.data())
}

export const requestLoginPopup = () => auth.signInWithPopup(googleProvider)
	.then(getUserFromCred)

export const fetchUser = callback => auth.onAuthStateChanged(cred => {
	getUserFromCred(cred).then(callback)
})

// Storage
const storageRef = firebase.storage().ref()

export const uploadFBFile = (name, file) => {
	if (!name || !file) throw 'The first two parameters of uploadImage(name, file) are required'
	return storageRef.child(name).put(file)
}

export const deleteFBFile = (path) => {
	if (!path) throw 'The first parameter of deleteFile(path) is required'
	return storageRef.child(path).delete()
}
