import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

const DivNavBar = styled(Grid)`
    background: #527c8d;
    height: 75px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
`
const InicioButton = styled(Link)`
    text-decoration: none;
    color: black;
    display: block;
    font-size: 2em;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
`
const OtrosButton = styled.h1`
    color: black;
`
const DropDown = styled.h1`
    position: relative;
    cursor: pointer;
`
const DropDownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    top: 40px;
    &:hover {
        dispaly: block;
    }
    ${DropDown}:hover & {
        display: block;
    }
`
const DropDownElement = styled(Link)`
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-size: 16px;
    color: black;
    &:hover {
        background-color: #f1f1f1
    }
`

function NavBar(props) {
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    async function handleLogout() {
        await logout()
        history.push("/login")
    }

    return (
        <DivNavBar container direction="row" justifyContent="space-around" id="NavBar">
            <InicioButton to="/">Inicio</InicioButton>
            <OtrosButton style={{color: 'grey'}}>Otros</OtrosButton>
            <OtrosButton style={{color: 'grey'}}>Otros</OtrosButton>
            <OtrosButton style={{color: 'grey'}}>Otros</OtrosButton>
            <DropDown id="DropDown">
                <DropDownContent id="DropDownContent">
                    <DropDownElement to="/update-profile">Actualizar Perfil</DropDownElement>
                    <DropDownElement to='#' onClick={handleLogout}>Desconectarse</DropDownElement>
                </DropDownContent>
                {currentUser.email}
            </DropDown>
        </DivNavBar>
    );
}

export default NavBar;