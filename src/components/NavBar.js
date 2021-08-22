import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

const DivNavBar = styled(Grid)`
    background: #527c8d;
    height: 75px;
    padding: 0px 35px;
    font-size: clamp(20px, 2vw, 30px);
    box-shadow:
        rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
        rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
        rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
`
const InicioButton = styled(Link)`
    text-decoration: none;
    color: black;
    display: block;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
`
const DropDown = styled.div`
    position: relative;
    cursor: pointer;
    user-select: none;
`
const DropDownContent = styled.div`
    display: ${props => props.isOpen ? 'block;' : 'none;'}
    position: absolute;
    background-color: #f9f9f9;
    width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    top: 50px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
`
const DropDownElement = styled(Link)`
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-size: 16px;
    color: black;
    &:hover {
        background-color: #f1f1f1;
    }
`
const LogoutButton = styled.div`
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-size: 16px;
    color: black;
    &:hover {
        background-color: #f1f1f1;
    }
`
const DropDownPeak = styled.div`
    position: absolute;
    display: ${props => props.isOpen ? 'block;' : 'none;'}
    width: 0px;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #f9f9f9;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 36px;
`

function NavBar(props) {
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [ stateDropDown , setStateDropDown ] = useState(false)
    const ref = useRef()

    async function handleLogout() {
        await logout()
        history.push("/login")
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (stateDropDown && ref.current && !ref.current.contains(e.target)) {
                setStateDropDown(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [stateDropDown])

    return (
        <DivNavBar container id="NavBar" direction="row" justifyContent="space-between" alignItems="center">
            <InicioButton to="/">Inicio</InicioButton>
            <DropDown ref={ref} onClick={() => setStateDropDown(!stateDropDown)} id="DropDown">
                <DropDownPeak isOpen={stateDropDown} />
                <DropDownContent isOpen={stateDropDown} id="DropDownContent">
                    <DropDownElement to="/profile/update">Actualizar Perfil</DropDownElement>
                    <LogoutButton onClick={handleLogout}>Desconectarse</LogoutButton>
                </DropDownContent>
                {currentUser.email}
            </DropDown>
        </DivNavBar>
    );
}

export default NavBar;