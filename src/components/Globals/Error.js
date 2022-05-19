import { GridContainer } from './Grid';
import styled from 'styled-components';

const ErrorGrid = styled(GridContainer)`
    background: lightcoral;
    font-family: cursive;
    text-align: center;
`

export default function Error(props) {
    const { error } = props;

    return (
        <ErrorGrid direction='column' justifyContent='center' alignContent='center'>
            <h1>Houston, tenemos un problema:</h1>
            <p>{`"${error}"`}</p>
            <h3>{`...Problemas de tener una Base de datos gratuita :(`}</h3>
        </ErrorGrid>
    );
}