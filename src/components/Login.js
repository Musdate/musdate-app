import React from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import 'firebase/auth';
import styled from 'styled-components'
import backgroundImage from '../.images/FantasyForest.png'

const GridSession = styled(Grid)`
    height: 450px;
    width: 400px;
    background-image: linear-gradient(to bottom right, #764c9b, #1d172b);
    15px 15px 25px 10px #00000080;
    padding: 3%;
    color: #e6e4d6;
    border-radius: 15px;
`;

const InputSession = styled.input`
    width: 100%;
    height: 35px;
    color: white;
    background: #7c69a845;
    border: none;
    outline: none;
    margin-top: 10px;
    padding-left: 10px;

`;

const ButtonSession = styled.button`
    width: 100%;
    height: 40px;
    background: #6f3eaa;
    border: none;
    color: #e6e4d6;
    cursor: pointer;
    font-size: 15px;
    &:hover {
        background: radial-gradient(circle, rgb(113, 61, 155) 0%, rgba(67, 11, 106, 0.76) 79%);
    }
`;

const SpanSession = styled.span`
    color: #eaea5f;
    cursor: pointer;
`;

const Backimage = styled.div`
    height: calc(100vh - 100px);
    background-image: url(${backgroundImage});
    background-size: cover;
    padding-top: 100px;
`;

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
        <Backimage>
            <GridSession>
                <Row>
                    <label htmlFor="email">Correo electrónico</label>
                </Row>
                <Row>
                    <InputSession type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Row>
                <Row>
                    <p>{emailError}</p>
                </Row>
                <Row>
                    <label htmlFor="password">Contraseña</label>
                </Row>
                <Row>
                    <InputSession type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Row>
                <Row>
                    <p>{passwordError}</p>
                </Row>
                {hasAccount ?
                    <>
                        <Row>
                            <ButtonSession onClick={handleLogin}>Ingresar</ButtonSession>
                        </Row>
                        <Row end="xs">
                            <p>
                                No tienes una cuenta ?
                                <SpanSession onClick={() => setHasAccount(!hasAccount)}> Crear cuenta</SpanSession>
                            </p>
                        </Row>
                    </>
                :
                    <>
                        <Row>
                            <ButtonSession onClick={handleSingup}>Crear cuenta</ButtonSession>
                        </Row>
                        <Row end="xs">
                            <p>
                                Tienes una cuenta ?
                                <SpanSession onClick={() => setHasAccount(!hasAccount)}> Ingresar</SpanSession>
                            </p>
                        </Row>
                    </>
                }
            </GridSession>
        </Backimage>
    )
}

export default Auth