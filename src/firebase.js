// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'

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