import React from 'react';
import { GridContainer } from './Globals/Grid';
import styled from 'styled-components';
import Footer from './Footer';
import NavBar from './NavBar';

const DivContainer = styled(GridContainer)`
    background: #EAEDED;
`
const DivBody = styled(GridContainer)`
    margin: auto;
    min-height: calc(100vh - 150px);
    width: clamp(320px, 1500px, 100% - 60px);
    @media (max-width: 768px) {
        width: clamp(320px, 1500px, 100% - 20px);
    }
`

function Layout(props) {
    return (
        <DivContainer id="Layout" direction="column">
            <NavBar />
            <DivBody id="page-container">
                {props.children}
            </DivBody>
            <Footer />
        </DivContainer>
    );
}

export default Layout;