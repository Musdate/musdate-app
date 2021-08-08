import React from 'react';
import styled from 'styled-components';

const DivFooter = styled.div`
    background: #527c8d;
    height: 75px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
`

function Footer(props) {
    return (
        <DivFooter id="Footer" />
    );
}

export default Footer;