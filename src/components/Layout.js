import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';

const DivContent = styled.div`
    #page-container {
        position: relative;
        max-height: 100vh;
        background: #EAEDED;
    }
`

function Layout(props) {
    return (
        <div>
            <NavBar />
            <DivContent id="page-container">
                {props.children}
            </DivContent>
        </div>
    );
}

export default Layout;