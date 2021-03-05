import React, { useState } from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';

function Auth(props) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const firebase = useFirebaseApp();
    const user = useUser();
    const submit = async() => {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
    };
    const logout = async() => {
        await firebase.auth().signOut();
    }
    const login = async() => {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log("SESION INICIADA", user.email)
    }
    !user && console.log("!user")
    user && console.log("user")
    console.log("usuarioo",user.email)
    return(
        <div>
            {
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" onChange={(e1) => setEmail(e1.target.value)} />
                    {console.log("inputEMAIL", email)}
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" onChange={(e2) => setPassword(e2.target.value)} />
                    <button onClick={submit}>Crear cuenta</button>
                    <button onClick={login}>Iniciar sesión</button>
                </div>
            }
            {
                user && <button onClick={logout}>Cerrar sesión</button>
            }
        </div>
    )
}

export default Auth