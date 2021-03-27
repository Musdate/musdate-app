import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCnATu1Nxkj2GDUTwJibxbkRgS6pDe-2f4",
    authDomain: "musdate-react-app.firebaseapp.com",
    projectId: "musdate-react-app",
    storageBucket: "musdate-react-app.appspot.com",
    messagingSenderId: "392970764005",
    appId: "1:392970764005:web:29e98f5449d85d108c9e0c"
});

export const auth = app.auth()
export default app