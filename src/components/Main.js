import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import styled from 'styled-components';

const GridContainer = styled(Grid)`
    max-width: 1500px;
    margin-left: auto;
    margin-right: auto;
`
const GridBox = styled(Grid)`
    width: 225px;
    height: 325px;
    background-image: url(${props => props.image});
    background-size: cover;
`
const TitleCat = styled(Grid)`
    text-align: center;
    cursor: pointer;
    height: 50px;
    margin-top: 15px !important;
    background: ${props => props.selected};
    line-height: 45px;
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
const ContainerBox = styled.div`
    position: relative;
    margin: 5px 0px;
`
const TopBox = styled(Grid)`
    position: absolute;
    color: white;
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
`
const TitleBox = styled.div`
    background-color: rgba(0,0,0,.6);
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-height: 20px;
    &:hover {
        overflow: visible;
        white-space: normal;
    }
`
const BottomBox = styled.div`
    text-align: center;
    position: absolute;
    color: white;
    background-color:
    ${props =>
        props.demoColor === 'Seinen' && `rgba(166, 12, 12, 0.74);`
    }
    ${props =>
        props.demoColor === 'Shoujo' && `rgba(206, 117, 192, 0.74);`
    }
    ${props =>
        props.demoColor === 'Shounen' && `rgba(223, 130, 30, 0.74);`
    }
    ${props =>
        props.demoColor === 'Josei' && `rgba(113, 11, 159, 0.74);`
    }
    width: 100%;
    bottom: 0px;
    min-height: 35px;
    line-height: 30px;
`
const RatingBox = styled(Grid)`
    background-color: rgba(0,0,0,.6);
    min-height: 20px;
    max-width: max-content;
    padding-right: 5px;
    font-weight: 700;
`
const StarRate = styled(StarRateRoundedIcon)`
    color: #ffdc5e;
`

const Box = (props) => {
    const {
        title,
        image,
        demography,
        category,
        productId,
        rating
    } = props

    return(
        <Link to={`/${category.toLowerCase()}/${productId}`}>
            <ContainerBox>
                <TopBox container direction="column" alignItems="flex-end">
                    <TitleBox>
                        {title}
                    </TitleBox>
                    <RatingBox container direction="row" alignItems="center">
                        <StarRate />
                        {rating}
                    </RatingBox>
                </TopBox>
                <GridBox image={image} />
                <BottomBox demoColor={demography}>
                    {demography}
                </BottomBox>
            </ContainerBox>
        </Link>
    );
}

const getMangas = async (setMangas, catState) => {
    await db.collection(catState.toLowerCase())
        .where('rating', '>', '8.5')
        .limit(24)
        .get()
        .then(querySnapshot => {
            const mangas = []
            querySnapshot.forEach(doc => {
                mangas.push({...doc.data()})
            });
            setMangas(mangas);
        });
}

function Main(props) {
    const [catState, setCatState] = useState('MANGA')
    const [mangas, setMangas] = useState([])

    useEffect(() => {
        getMangas(setMangas, catState);
    }, [catState]);

    return (
        <GridContainer id="GridContainer">
            <Grid container direction="row" justifyContent="space-around">
                <TitleCat item xs selected={catState === 'MANGA' && 'grey'}onClick={() => {setCatState('MANGA')}}>Mangas</TitleCat>
                <TitleCat item xs selected={catState === 'MANHUA' && 'grey'} onClick={() => {setCatState('MANHUA')}}>Manhua</TitleCat>
                <TitleCat item xs selected={catState === 'MANHWA' && 'grey'} onClick={() => {setCatState('MANHWA')}}>Manhwa</TitleCat>
            </Grid>
            <Grid container justifyContent="space-between">
                {mangas.map((p, index) => (
                    <Box
                        key={index}
                        title={p.title}
                        image={p.image}
                        demography={p.demography}
                        category={p.category}
                        productId={p.productId}
                        rating={p.rating}
                    />
                ))}
            </Grid>
        </GridContainer>
    );
}

export default Main;