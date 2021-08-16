import React, { useRef, useState } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
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
    margin: ${props => props.header ? '0px;' : '5px 0px 15px 10px;'}
`
const CardTitle = styled(Col)`
    font-size: 25px;
`
const FooterLink = styled(Link)`
    color: #eaea5f;
    line-height: 35px;
    text-decoration: none;
    &:hover {
        color: #ff0;
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
        <Backimage>
            <GridSession>
                <RowActions center="xs">
                    <CardTitle>
                        Actualizar Contraseña
                    </CardTitle>
                </RowActions>
                {message &&
                    <Row center="xs">
                        {message}
                    </Row>
                }
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
                        <InputSession type="email" ref={emailRef} required />
                    </Row>
                    <Row>
                        <ErrorMsg></ErrorMsg>
                    </Row>
                    <Row>
                        <ButtonSession disabled={loading} onClick={handleSubmit}>Resetear Pass</ButtonSession>
                    </Row>
                    <Row end="xs">
                        <FooterLink to="/login">Iniciar Sesion</FooterLink>
                    </Row>
                </DivContent>
            </GridSession>
        </Backimage>
    );
}

export default ResetPassword;