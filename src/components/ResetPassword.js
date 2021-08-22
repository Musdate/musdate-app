import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import backgroundImage from '../.images/FantasyForest.png'
import styled from 'styled-components'
import 'firebase/auth';

const Backimage = styled(Grid)`
    height: 100vh;
    background-image: url(${backgroundImage}), linear-gradient(to right, #23182d 0%, #493557 50%, #595478 75%, #2e1f33 100%);
    background-size: cover;
`
const GridSession = styled(Grid)`
    height: 400px;
    width: clamp(300px, 350px, (100% - 20px));
    min-width: 300px;
    background: linear-gradient(to bottom right, #764c9b, #1d172b);
    color: #e6e4d6;
    border-radius: 15px;
`
const RowActions = styled(Grid)`
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
    margin-top: 30px;
    &:hover {
        background: radial-gradient(circle, rgb(110, 65, 170) 0%, rgb(100, 70, 135) 80%);
    }
`
const DivContent = styled(Grid)`
    padding: 15px 34px;
`
const ErrorMsg = styled.p`
    color: #c6384c;
    font-size: 14px;
    margin: ${props => props.header ? '0px;' : '5px 0px 15px 10px;'}
`
const CardTitle = styled(Grid)`
    font-size: 25px;
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

function ResetPassword(props) {
    const { resetPassword } = useAuth()
    const [ loading, setLoading ] = useState(false)
    const [ message, setMessage ] = useState("")
    const [ error, setError ] = useState("")
    const emailRef = useRef()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Correo enviado !!')
        } catch {
            setError("Algo anda mal...")
        }
        setLoading(false)
    }

    return (
        <Backimage container justifyContent="center" alignItems="center">
            <GridSession>
                <RowActions
                    container
                    alignItems="center"
                    justifyContent="space-around"
                    direction="row"
                >
                    <CardTitle>
                        Actualizar Contraseña
                    </CardTitle>
                </RowActions>
                {message &&
                    <Grid container justifyContent="center">
                        {message}
                    </Grid>
                }
                {error &&
                    <Grid container justifyContent="center">
                        <ErrorMsg header>{error}</ErrorMsg>
                    </Grid>
                }
                <DivContent container direction="column">
                    <label id="email">Correo electrónico</label>
                    <InputSession type="email" ref={emailRef} required />
                    <ButtonSession disabled={loading} onClick={handleSubmit}>Enviar</ButtonSession>
                    <FooterLink to="/login">Iniciar Sesion</FooterLink>
                </DivContent>
            </GridSession>
        </Backimage>
    );
}

export default ResetPassword;