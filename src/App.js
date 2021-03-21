import { useEffect, useState } from 'react';
import { useFirebaseApp } from 'reactfire';
import Layout from './components/Layout';
import Login from './components/Login';
import Main from './components/Main';
import './App.css';
import {
    Switch,
    BrowserRouter as Router,
    Route,
    Redirect
} from "react-router-dom";

function App() {
    const firebase = useFirebaseApp();
    const [ user, setUser ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ hasAccount, setHasAccount ] = useState(true);
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

    const handleLogin = () => {
        clearErrors();
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
            switch(error.code){
                case "auth/invalid-email":
                    return setEmailError("Correo invalido")
                case "auth/user-disabled":
                    return setEmailError("Usuario deshabilitado")
                case "auth/user-not-found":
                    return setEmailError("Usuario no encontrado")
                case "auth/wrong-password":
                    return setpasswordError("Contraseña incorrecta")
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
                    return setEmailError("El correo ya está en uso")
                case "auth/invalid-email":
                    return setEmailError("Correo invalido")
                case "auth/weak-password":
                    return setpasswordError("Contraseña muy debil")
                // no default
            }
        });
    }

    const handleLogOut = () => {
        firebase.auth().signOut();
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(authUser => {
            if(authUser){
                clearInputs();
                setUser(authUser);
            }else{
                setUser('');
            }
        })
    //eslint-disable-next-line
    }, [])

    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    {user && <Redirect to='/main' />}
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
                            clearInputs={clearInputs}
                            clearErrors={clearErrors}
                        />
                </Route>
                <Route path='/main'>
                    {!user && <Redirect to='/' />}
                    <Layout>
                        <Main handleLogOut={handleLogOut} />
                    </Layout>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;