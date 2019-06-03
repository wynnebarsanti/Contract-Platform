import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCQ1tCSoyG0wI9n9Ajm90fJCh4pevjKXqw",
  authDomain: "contract-platform.firebaseapp.com",
  databaseURL: "https://contract-platform.firebaseio.com",
  projectId: "contract-platform",
  storageBucket: "contract-platform.appspot.com",
  messagingSenderId: "946312988132",
  appId: "1:946312988132:web:372c245cd22f7fc2"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
