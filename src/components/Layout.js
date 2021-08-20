import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import NavBar from './NavBar';

const DivContent = styled.div`
    background: #EAEDED;
    min-height: calc(100vh - 150px);
`

function Layout(props) {
    return (
        <div id="Layout">
            <NavBar />
            <DivContent id="page-container">
                {props.children}
            </DivContent>
            <Footer />
        </div>
    );
}

export default Layout;