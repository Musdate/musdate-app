import React from 'react';
import 'firebase/auth';

function Auth(props) {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSingup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props

    return(
        <div>
            <div>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p>{emailError}</p>
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p>{passwordError}</p>
                </div>
                <div>
                    {hasAccount ?
                        <>
                            <button onClick={handleLogin}>Sing up</button>
                            <p>
                                Don't have an account ?
                                <span onClick={() => setHasAccount(!hasAccount)}>Sing up</span>
                            </p>
                        </>
                    :
                        <>
                            <button onClick={handleSingup}>Sing in</button>
                            <p>
                                Have an account ?
                                <span onClick={() => setHasAccount(!hasAccount)}>Sing up</span>
                            </p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Auth