import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const config = {
    apiKey              : "AIzaSyDmWMpV3wdL_zQF7DKRrWKFyTZaGUM0mXo",
    authDomain          : "find-it-8d54e.firebaseapp.com",
    databaseURL         : "https://find-it-8d54e.firebaseio.com",
    projectId           : "find-it-8d54e",
    storageBucket       : "find-it-8d54e.appspot.com",
    messagingSenderId   : "584988787441"
}

firebase.initializeApp(config)

firebase.firestore()

const storage = firebase.storage()

export default firebase
export {
    storage
}
