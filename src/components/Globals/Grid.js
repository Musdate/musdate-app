import styled from 'styled-components';

export const GridContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing:border-box;
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
    flex-direction: ${props => props.direction};
`

export const GridItem = styled.div`
    flex-grow: 1;
    max-width: 100%;
    flex-basis: 0;
`