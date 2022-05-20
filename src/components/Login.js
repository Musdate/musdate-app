import React, { useRef, useState } from 'react';
import { GridContainer, GridItem } from './Globals/Grid';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import backgroundImage from '../.images/FantasyForest.png'
import styled from 'styled-components'
import 'firebase/auth';

const Backimage = styled(GridContainer)`
    height: 100vh;
    background-image: url(${backgroundImage}), linear-gradient(to right, #23182d 0%, #493557 50%, #595478 75%, #2e1f33 100%);
    background-size: cover;
`
const GridSession = styled(GridContainer)`
    height: 400px;
    width: clamp(300px, 350px, (100% - 20px));
    min-width: 300px;
    background: linear-gradient(to bottom right, #764c9b, #1d172b);
    color: #e6e4d6;
    border-radius: 15px;
`
const RowActions = styled(GridContainer)`
    height: 60px;
`
const InputSession = styled.input`
    height: 35px;
    color: white;
    background: #7c69a845;
    border: none;
    outline: none;
    margin-top: 10px;
    padding: 0px 10px;
`
const ButtonSession = styled.button`
    height: 40px;
    background: #6f3eaa;
    border: none;
    color: #e6e4d6;
    cursor: pointer;
    font-size: 15px;
    margin: 15px 0px 0px 0px;
    &:hover {
        background: radial-gradient(circle, rgb(110, 65, 170) 0%, rgb(100, 70, 135) 80%);
    }
    &:disabled {
        cursor: default;
        background: #6a63735e;
    }
`
const LoginButton = styled(GridItem)`
    text-align: center;
    font-size: ${props => props.$isClicked === "ingresar" ? "27px" : "25px"};
    color: ${props => props.$isClicked === "ingresar" ? "#ff0" : "#eaea5f"};
    cursor: pointer;
        &:hover {
        font-size: 27px;
        color: #ff0;
    }
`
const RegisterButton = styled(GridItem)`
    text-align: center;
    font-size: ${props => props.$isClicked === "registrarse" ? "27px" : "25px"};
    color:${props => props.$isClicked === "registrarse" ? "#ff0" : "#eaea5f"};
    cursor: pointer;
    &:hover {
        font-size: 27px;
        color: #ff0;
    }
`
const DivContent = styled(GridContainer)`
    padding: 15px 34px;
`
const ErrorMsg = styled.p`
    color: #c6384c;
    font-size: 14px;
    margin: ${props => props.$header ? '0px;' : '5px 0px 10px 10px;'}
`
const FooterLink = styled(Link)`
    color: #eaea5f;
    line-height: 35px;
    text-decoration: none;
    width: max-content;
    &:hover {
        color: #ff0;
        text-decoration: underline;
    }
`

function Auth(props) {
    const { singUp, login } = useAuth()
    const [ passwordError, setPasswordError ] = useState("")
    const [ hasAccount, setHasAccount ] = useState(true)
    const [ handleStyle, setHandleStyle ] = useState("ingresar")
    const [ emailError, setEmailError ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ error, setError]  = useState("")
    const history = useHistory()
    const passwordRef = useRef()
    const emailRef = useRef()

    async function handleSingUp(e) {
        e.preventDefault()
        try {
            setLoading(true)
            await singUp(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch(r) {
            switch(r.code){
                case "auth/email-already-in-use":
                    return setEmailError("El correo ya está en uso")
                case "auth/invalid-email":
                    return setEmailError("Correo invalido")
                case "auth/weak-password":
                    return setPasswordError("Contraseña muy debil")
                default: setError("Falló el registro")
            }
        }
        setLoading(false)
    }

    async function handleLogin(e) {
        e.preventDefault()
        try {
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch(r) {
            switch(r.code) {
                case "auth/invalid-email":
                    return setEmailError("Correo invalido")
                case "auth/user-disabled":
                    return setEmailError("Usuario deshabilitado")
                case "auth/user-not-found":
                    return setEmailError("Usuario no encontrado")
                case "auth/wrong-password":
                    return setPasswordError("Contraseña incorrecta")
                default: setError("Falló el inicio de sesion")
            }
        }
        setLoading(false)
    }

    const handleSearch = (e) => {
        if(e.key === 'Enter') {
            if(hasAccount) {
                handleLogin(e)
            }else {
                handleSingUp(e)
            }
        }
    }

    return (
        <Backimage justifyContent="center" alignItems="center">
            <GridSession direction='column'>
                <RowActions
                    alignItems="center"
                    justifyContent="space-around"
                    direction="row"
                >
                    <RegisterButton
                        $isClicked={handleStyle}
                        onClick={() => {
                            setHasAccount(false)
                            setHandleStyle("registrarse")
                            setEmailError("")
                            setPasswordError("")
                            setLoading(false)
                        }}
                    >
                        Registrarse
                    </RegisterButton>
                    <LoginButton
                        $isClicked={handleStyle}
                        onClick={() => {
                            setHasAccount(true)
                            setHandleStyle("ingresar")
                            setEmailError("")
                            setPasswordError("")
                            setLoading(false)
                        }}
                    >
                        Ingresar
                    </LoginButton>
                </RowActions>
                {error &&
                    <GridContainer justifyContent="center">
                        <ErrorMsg $header>{error}</ErrorMsg>
                    </GridContainer>
                }
                <DivContent direction="column">
                    <label htmlFor="email">Correo electrónico</label>
                    <InputSession
                        type="email"
                        id="email"
                        ref={emailRef}
                        onKeyDown={(e) => handleSearch(e)}
                        onChange={() => {
                            setLoading(false)
                            setEmailError("")
                        }}
                        required
                    />
                    <ErrorMsg>{emailError}</ErrorMsg>
                    <label htmlFor="password">Contraseña</label>
                    <InputSession
                        type="password"
                        id="password"
                        ref={passwordRef}
                        onKeyDown={(e) => handleSearch(e)}
                        onChange={() => {
                            setLoading(false)
                            setPasswordError("")
                        }}
                        required
                    />
                    <ErrorMsg>{passwordError}</ErrorMsg>
                    {hasAccount ?
                        <>
                            <ButtonSession disabled={loading} onClick={handleLogin}>Ingresar</ButtonSession>
                            <FooterLink to="/password/reset">Olvidaste tu contraseña?</FooterLink>
                        </>
                    :
                        <ButtonSession disabled={loading} onClick={handleSingUp}>Crear cuenta</ButtonSession>
                    }
                </DivContent>
            </GridSession>
        </Backimage>
    );
}

export default Auth;