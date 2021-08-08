import React, { useRef, useState } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import backgroundImage from '../.images/FantasyForest.png'
import styled from 'styled-components'
import 'firebase/auth';

const GridSession = styled(Grid)`
    height: 400px;
    max-height: max-content;
    width: 350px;
    background-image: linear-gradient(to bottom right, #764c9b, #1d172b);
    15px 15px 25px 10px #00000080;
    color: #e6e4d6;
    border-radius: 15px;
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
    background-image: url(${backgroundImage}), linear-gradient(to right, #23182d 0%, #493557 50%, #595478 75%, #2e1f33 100%);
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
    ${props => props.header && `
        margin: 0px;
    `}
`
const FooterLink = styled(Link)`
    color: #eaea5f;
    line-height: 35px;
    text-decoration: none;
    &:hover {
        color: #ff0;
    }
`

function Auth(props) {
    const { singUp, login } = useAuth()
    const [ passwordError, setPasswordError ] = useState("")
    const [ hasAccount, setHasAccount ] = useState(true)
    const [ handleStyle, setHandleStyle ] = useState("")
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
                    {error &&
                        <Row center="xs">
                            <ErrorMsg header>{error}</ErrorMsg>
                        </Row>
                    }
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
                    {hasAccount ?
                        <>
                            <Row>
                                <ButtonSession disabled={loading} onClick={handleLogin}>Ingresar</ButtonSession>
                            </Row>
                            <Row end="xs">
                                <FooterLink to="/reset-password">Olvidaste tu contraseña?</FooterLink>
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
    );
}

export default Auth;