import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDkLGUnZve8qOIQmLgTPTBhrG2p5KMiM0M",
  authDomain: "contract-platform.firebaseapp.com",
  databaseURL: "https://contract-platform.firebaseio.com",
  projectId: "contract-platform",
  storageBucket: "contract-platform.appspot.com",
  messagingSenderId: "946312988132",
  appId: "1:946312988132:web:372c245cd22f7fc2"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
