import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyDkr34l-a_WxMFhYeOCFo4O9Q3k-fJsnNw",
    authDomain: "locmaq-c04b0.firebaseapp.com",
    databaseURL: "https://locmaq-c04b0.firebaseio.com",
    projectId: "locmaq-c04b0",
    storageBucket: "locmaq-c04b0.appspot.com",
    messagingSenderId: "901181262347",
    appId: "1:901181262347:web:a997f7bb9b09a545cbd50e",
    measurementId: "G-1K7T0LGQBJ"
  };

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;