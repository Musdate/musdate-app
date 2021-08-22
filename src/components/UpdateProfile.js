import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Grid } from '@material-ui/core';
import styled from 'styled-components'
import 'firebase/auth';

const InputSession = styled.input`
    height: 35px;
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
`
const ErrorMsg = styled.p`
    color: #c6384c;
    margin: ${props => props.header ? '0px;' : '5px 0px 15px 10px;'}
`
const GridContainer = styled(Grid)`
    width: clamp(300px, 50%, (100% - 20px));
    min-width: 300px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
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
        <Grid container justifyContent="center" alignItems="center">
            <GridContainer direction="column">
                <h1>Actualizar perfil</h1>
                {error &&
                    <ErrorMsg header>{error}</ErrorMsg>
                }
                <label id="email">Correo electrónico</label>
                <InputSession
                    type="email"
                    ref={emailRef}
                    defaultValue={currentUser.email}
                    onKeyDown={(e) => handleSearch(e)}
                    required
                />
                <ErrorMsg>{emailError}</ErrorMsg>
                <label id="password">Contraseña</label>
                <InputSession
                    type="password"
                    ref={passwordRef}
                    placeholder="Dejar en blanco para mantener"
                    onKeyDown={(e) => handleSearch(e)}
                />
                <ErrorMsg>{passwordError}</ErrorMsg>
                    <ButtonSession disabled={loading} onClick={handleSubmit}>Actualizar</ButtonSession>
            </GridContainer>
        </Grid>
    );
}

export default UpdateProfile;