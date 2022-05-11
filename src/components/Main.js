import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import styled from 'styled-components';
import Loading from './Loading';

const GridContainer = styled(Grid)`
    max-width: 1500px;
    margin-left: auto;
    margin-right: auto;
    min-height: calc(100vh - 150px);
`
const GridBox = styled(Grid)`
    width: 225px;
    height: 325px;
    background-image: url(${props => props.image});
    background-size: cover;

    @media (max-width: 724px) {
        width: 185px;
        height: 285px;
    }
    @media (max-width: 605px) {
        width: 225px;
        height: 325px;
    }
    @media (max-width: 490px) {
        width: 185px;
        height: 285px;
    }
    @media (max-width: 410px) {
        width: 160px;
        height: 260px;
    }
    @media (max-width: 360px) {
        width: 150px;
        height: 250px;
    }
`
const TitleCat = styled(Grid)`
    text-align: center;
    cursor: pointer;
    height: 50px;
    background: ${props => props.selected};
    line-height: 45px;
    text-decoration: none;
    color: black;
    display: block;
    font-size: clamp(20px, 2vw, 30px);
    font-weight: bold;
    width: 33%;
`
const ContainerBox = styled.div`
    position: relative;
    margin: 5px 5px;
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
        props.demoColor === 'seinen' && `rgba(166, 12, 12, 0.74);`
    }
    ${props =>
        props.demoColor === 'shoujo' && `rgba(206, 117, 192, 0.74);`
    }
    ${props =>
        props.demoColor === 'shounen' && `rgba(223, 130, 30, 0.74);`
    }
    ${props =>
        props.demoColor === 'josei' && `rgba(113, 11, 159, 0.74);`
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
const SelectorContainer = styled(Grid)`
    margin: 15px 5px 5px 5px;
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
            <ContainerBox id="ContainerBox">
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

// const getMangas = async (setMangas, catState, setRandomMangas, setError, setIsLoading) => {
//     await db.collection(catState.toLowerCase())
//         //.where('rating', '>', '8.5')
//         .get()
//         .then(querySnapshot => {
//             const mangas = []
//             querySnapshot.forEach(doc => {
//                 mangas.push({...doc.data()})
//             });
//             setMangas(mangas);
//             setRandomMangas((mangas.sort(() => Math.random() - Math.random()).slice(0, 24)));
//             setIsLoading(false)
//         })
//         .catch(error => {
//             setError(error.message)
//             setIsLoading(false)
//         });
// }

//MANGADEX API

function Main(props) {
    const [ catState, setCatState ] = useState('MANGA')
    const [ mangas, setMangas ] = useState([])
    const [ error, setError ] = useState('')
    const [ isLoading, setIsLoading ] = useState(true);
    
    async function getMangas(){
        const pageReq = await fetch('https://api.mangadex.org/manga?limit=5')
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
        await pageReq.json()
        .then(data => {
            setMangas(data.data);
            console.log(data.data);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        getMangas();
    }, [catState]);

    return (
        <GridContainer id="GridContainer" container>
            {isLoading ?
                <Loading />
            :
                <>
                    <SelectorContainer container direction="row" justifyContent="space-around">
                        <TitleCat item xs selected={catState === 'MANGA' && 'grey'}onClick={() => {setCatState('MANGA')}}>Mangas</TitleCat>
                        <TitleCat item xs selected={catState === 'MANHUA' && 'grey'} onClick={() => {setCatState('MANHUA')}}>Manhua</TitleCat>
                        <TitleCat item xs selected={catState === 'MANHWA' && 'grey'} onClick={() => {setCatState('MANHWA')}}>Manhwa</TitleCat>
                    </SelectorContainer>
                    {error &&
                        <Grid style={{background: 'lightcoral'}} container direction="column" justifyContent="center" alignContent="center">
                            <h1>Houston, tenemos un problema:</h1>
                            <p style={{fontFamily: 'cursive', textAlign: 'center'}}>{`"${error}"`}</p>
                            <h3>{`...Problemas de tener una Base de datos gratuita :(`}</h3>
                        </Grid>
                    }
                    <Grid container justifyContent="space-between">
                        {mangas.map((p, index) => (
                            <Box
                                key={index}
                                title={p.attributes.title.en}
                                image={p}
                                demography={p.attributes.publicationDemographic}
                                category={p.type}
                                productId={p.id}
                                rating={0}
                            />
                        ))}
                    </Grid>
                    {/* <button
                        style={{margin: '10px 0px 30px 5px', height: '40px'}}
                        onClick={() => setRandomMangas((mangas.sort(() => Math.random() - Math.random()).slice(0, 24)))}
                        disabled={error}
                    >
                        Actualizar
                    </button> */}
                </>
            }
        </GridContainer>
    );
}

export default Main;