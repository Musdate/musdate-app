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
`
const Backimage = styled.div`
    height: 100vh;
    background-image: url(${backgroundImage}), linear-gradient(to right, #23182d 0%, #493557 50%, #595478 75%, #2e1f33 100%);
    background-size: cover;
    display: flex;
    align-items: center;
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
const CardTitle = styled(Col)`
    font-size: 25px;
`

function UpdateProfile(props) {
    const {
        currentUser,
        updateEmail,
        updatePassword
    } = useAuth()
    const [passwordError, setPasswordError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState("")
    const history = useHistory()
    const passwordRef = useRef()
    const emailRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()
        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value !== currentUser.password) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        })
        .catch((r) => {
            switch(r.code) {
                case "auth/email-already-in-use":
                    return setEmailError("El correo ya está en uso")
                case "auth/invalid-email":
                    return setEmailError("Correo invalido")
                case "auth/weak-password":
                    return setPasswordError("Contraseña muy debil")
                default: setError("Algo anda mal...")
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }

    const handleSearch = (e) => {
        if(e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    return (
        <Backimage>
            <GridSession>
                <RowActions center="xs">
                    <CardTitle>
                        Actualizar perfil
                    </CardTitle>
                </RowActions>
                {error &&
                    <Row center="xs">
                        <ErrorMsg header>{error}</ErrorMsg>
                    </Row>
                }
                <DivContent>
                    <Row>
                        <label id="email">Correo electrónico</label>
                    </Row>
                    <Row>
                        <InputSession
                            type="email"
                            ref={emailRef}
                            defaultValue={currentUser.email}
                            onKeyDown={(e) => handleSearch(e)}
                            required
                        />
                    </Row>
                    <Row>
                        <ErrorMsg>{emailError}</ErrorMsg>
                    </Row>
                    <Row>
                        <label id="password">Contraseña</label>
                    </Row>
                    <Row>
                        <InputSession
                            type="password"
                            ref={passwordRef}
                            placeholder="Dejar en blanco para mantener"
                            onKeyDown={(e) => handleSearch(e)}
                        />
                    </Row>
                    <Row>
                        <ErrorMsg>{passwordError}</ErrorMsg>
                    </Row>
                    <Row>
                        <ButtonSession disabled={loading} onClick={handleSubmit}>Actualizar</ButtonSession>
                    </Row>
                    <Row end="xs">
                        <FooterLink to="/">Atras</FooterLink>
                    </Row>
                </DivContent>
            </GridSession>
        </Backimage>
    );
}

export default UpdateProfile