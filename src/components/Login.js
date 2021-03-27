import React, { useRef, useState } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import backgroundImage from '../.images/FantasyForest.png'
import styled from 'styled-components'
import 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const GridSession = styled(Grid)`
    height: 400px;
    width: 350px;
    background-image: linear-gradient(to bottom right, #764c9b, #1d172b);
    15px 15px 25px 10px #00000080;
    color: #e6e4d6;
    border-radius: 15px;
    @media (max-width: 1200px) {
    }
    @media (max-width: 767px) {
    }
    @media (max-width: 575px) {
        width: 300px;
    }
`
const InputSession = styled.input`
    width: 100%;
    height: 35px;
    color: white;
    background: #7c69a845;
    border: none;
    outline: none;
    margin-top: 10px;
    padding-left: 10px;

`
const ButtonSession = styled.button`
    width: 100%;
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
const Backimage = styled.div`
    height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    display: flex;
    align-items: center;
`
const ButtonIngresar = styled(Col)`
    font-size: ${props => props.isClicked === "ingresar" ? "27px" : "25px"};
    color: ${props => props.isClicked === "ingresar" ? "#ff0" : "#eaea5f"};
    cursor: pointer;
    &:hover {
        font-size: 27px;
        color: #ff0;
    }
`
const ButtonRegistrarse = styled(Col)`
    font-size: ${props => props.isClicked === "registrarse" ? "27px" : "25px"};
    color:${props => props.isClicked === "registrarse" ? "#ff0" : "#eaea5f"};
    cursor: pointer;
    &:hover {
        font-size: 27px;
        color: #ff0;
    }
`
const RowActions = styled(Row)`
    padding: 10px 0px;
    height: 60px;
`
const DivContent = styled.div`
    padding: 15px 34px;
`
const ErrorMsg = styled.p`
    color: #c6384c;
    margin: 5px 0px 15px 10px;
`

function Auth(props) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { singUp, login } = useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [ hasAccount, setHasAccount ] = useState(true);
    const [error, setError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [ handleStyle, setHandleStyle ] = useState("")

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
            switch(r.code){
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
                handleLogin(e);
            }else {
                handleSingUp(e);
            }
        }
    }

    return(
        <Backimage>
            <GridSession>
                <div>
                    <RowActions around="xs">
                        <ButtonRegistrarse
                            isClicked={handleStyle}
                            onClick={() => {
                                setHasAccount(false)
                                setHandleStyle("registrarse")
                                setEmailError("")
                                setPasswordError("")
                                setLoading(false)
                            }}
                        >
                            Registrarse
                        </ButtonRegistrarse>
                        <ButtonIngresar
                            isClicked={handleStyle}
                            onClick={() => {
                                setHasAccount(true)
                                setHandleStyle("ingresar")
                                setEmailError("")
                                setPasswordError("")
                                setLoading(false)
                            }}
                        >
                            Ingresar
                        </ButtonIngresar>
                    </RowActions>
                </div>
                <DivContent>
                    <Row>
                        <label htmlFor="email">Correo electrónico</label>
                    </Row>
                    <Row>
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
                    </Row>
                    <Row>
                        <ErrorMsg>{emailError}</ErrorMsg>
                    </Row>
                    <Row>
                        <label htmlFor="password">Contraseña</label>
                    </Row>
                    <Row>
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
                    </Row>
                    <Row>
                        <ErrorMsg>{passwordError}</ErrorMsg>
                    </Row>
                    {hasAccount  ?
                        <>
                            <Row>
                                <ButtonSession disabled={loading} onClick={handleLogin}>Ingresar</ButtonSession>
                            </Row>
                            <Row>
                                <Link to="/reset-password">Olvidaste tu contraseña ?</Link>
                            </Row>
                        </>
                    :
                        <Row>
                            <ButtonSession disabled={loading} onClick={handleSingUp}>Crear cuenta</ButtonSession>
                        </Row>
                    }
                </DivContent>
            </GridSession>
        </Backimage>
    )
}

export default Auth