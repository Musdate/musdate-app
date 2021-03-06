import { useFirebaseApp } from 'reactfire';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Hero from './components/Hero';
import './App.css';

function App() {
    const firebase = useFirebaseApp();
    const [ user, setUser ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ hasAccount, setHasAccount ] = useState(false);
    const [ emailError, setEmailError ] = useState('');
    const [ passwordError, setpasswordError ] = useState('');

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }
    const clearErrors = () => {
        setEmailError('');
        setpasswordError('');
    }

    const authListener = () => {
        firebase.auth().onAuthStateChanged(authUser => {
            if(authUser){
                clearInputs();
                setUser(authUser);
            }else{
                setUser('');
            }
        })
    }

    useEffect(() => {
        authListener();
    }, [])

    const handleLogin = () => {
        clearErrors();
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
            switch(error.code){
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(error.message);
                    break;
                case "auth/wrong-password":
                    setpasswordError(error.message);
                    break;
                // no default
            }
        });
    }

    const handleSingup = () => {
        clearErrors();
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => {
            switch(error.code){
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(error.message);
                    break;
                case "auth/weak-password":
                    setpasswordError(error.message);
                    break;
                // no default
            }
        });
    }

    const handleLogOut = () => {
        firebase.auth().signOut();
    }

    return (
        <div className="App">
            {user ?
                <Hero
                    handleLogOut={handleLogOut}
                />
            :
                <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSingup={handleSingup}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                passwordError={passwordError}
                />
            }
        </div>
    );
}

export default App;