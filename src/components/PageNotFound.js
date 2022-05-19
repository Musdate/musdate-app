import { GridContainer } from './Globals/Grid';
import { Link } from 'react-router-dom';
import backgroundImage from '../.images/FantasyForest.png'
import styled from 'styled-components';

const Backimage = styled(GridContainer)`
    height: 100vh;
    background-image: url(${backgroundImage}), linear-gradient(to right, #23182d 0%, #493557 50%, #595478 75%, #2e1f33 100%);
    background-size: cover;
`
const GridPage = styled(GridContainer)`
    width: clamp(300px, 350px, (100% - 20px));
    min-width: 300px;
    background: linear-gradient(to bottom right, #764c9b, #1d172b);
    color: #e6e4d6;
    border-radius: 15px;
    padding: 20px;
`
const ButtonSession = styled(Link)`
    width: 100%;
    height: 40px;
    background: #6f3eaa;
    border: none;
    cursor: pointer;
    font-size: 15px;
    margin: 15px 0px 0px 0px;
    &:hover {
        background: radial-gradient(circle, rgb(110, 65, 170) 0%, rgb(100, 70, 135) 80%);
    }
    text-decoration:none;
    color: #e6e4d6;
    display: flex;
    align-items: center;
    justify-content: center;
`
const GridTitle = styled.div`
    font-weight: 600;
    font-size: 30px;
`

function PageNotFound(props) {
    return (
        <Backimage direction='column' justifyContent='center' alignItems='center'>
            <GridPage direction='column' alignItems='center'>
                <GridTitle>PAGE NOT FOUND !!</GridTitle>
                <ButtonSession to='/'>Ir al inicio</ButtonSession>
            </GridPage>
        </Backimage>
    );
}

export default PageNotFound;