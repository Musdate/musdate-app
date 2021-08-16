import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyCnATu1Nxkj2GDUTwJibxbkRgS6pDe-2f4",
    authDomain: "musdate-react-app.firebaseapp.com",
    databaseURL: "https://musdate-react-app-default-rtdb.firebaseio.com",
    projectId: "musdate-react-app",
    storageBucket: "musdate-react-app.appspot.com",
    messagingSenderId: "392970764005",
    appId: "1:392970764005:web:29e98f5449d85d108c9e0c"
});

export const auth = app.auth();
export const db = app.firestore();
export default app;