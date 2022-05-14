import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import Loading from './Loading';
import DefaultImage from '../.images/DefaultImage.png'

const Image = styled.img`
    max-width: 25%;
    height: 400px;
`
const ChapterContainer = styled.div`
    width: 100%;
    padding: 30px;
`
const ChapterRow = styled(Grid)`
    height: 50px;
    background: white;
    border: 1px solid #cdcfd6;
    border-bottom: none;
    font-size: 24px;
    padding: 0px 15px;
    color: #1d4b5e;
    ${props => props.end &&
        `background: #1d4b5e;
        color: white;
        font-size: 17px;
        height: 40px;
        cursor: pointer;
        margin-bottom: 25px`
    }
`
const InfoSection = styled(Grid)`
    padding: 30px;
`
const TextInfo = styled.div`
    margin-bottom: 15px;
    ${props => props.title &&
        `font-weight: 600;
        font-size: 30px;`
    }
    ${props => props.genres &&
        `margin-right: 15px;
        font-weight: 600;
        font-size: 17px;`
    }
    ${props => props.alt &&
        `margin-right: 15px;
        font-size: 17px;`
    }
`
const DetailSection = styled(Grid)`
    max-width: 75%;
    padding: 0px 30px;
`
const LabelInfo = styled.div`
    color: grey;
    font-weight: 600;
    font-size: 22px;
`
const GridContainer = styled(Grid)`
    max-width: 1500px;
    margin-left: auto;
    margin-right: auto;
    min-height: calc(100vh - 150px);
`

async function getManga(props){
    const {
        productId,
        setManga,
        setIsLoading
    } = props

    const pageReq = await fetch(`https://api.mangadex.org/manga/${productId}?includes[]=cover_art`)
    .catch(error => {
        //setError(error.message);
        setIsLoading(false);
    });
    await pageReq.json()
    .then(mangasData => {
        setManga(mangasData.data);
        setIsLoading(false);
    })
    .catch(error => {
        //setError(error.message);
        setIsLoading(false);
    });

    // db.collection(`${category}_chapters`)
    //     .where('productId', '==', productId)
    //     .orderBy('index')
    //     .get()
    //     .then(snapshotDoc => {
    //         const chapters = []
    //         snapshotDoc.forEach(chapterDoc => {
    //             chapters.push({id: chapterDoc.id, ...chapterDoc.data()})

    //             db.collection(`${category}_chapters`)
    //                 .doc(chapterDoc.id)
    //                 .collection('scans')
    //                 .get()
    //                 .then(scanDoc => {
    //                     const scansChaps = []
    //                     scanDoc.forEach(doc => {
    //                         scansChaps.push({id: doc.id, ...doc.data()})
    //                     })
    //                     setScans(scansChaps)
    //                     setIsLoading(false)
    //                 });
    //         });
    //         setChapters(chapters)
    //         setSliceChapters(chapters.slice(0, 10))
    //     });
}

function ProductView(props) {
    const { productId, category } = useParams();
    const [ manga, setManga ] = useState();
    const [ chapters, setChapters] = useState();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ sliceChapters, setSliceChapters ] = useState([]);
    const [ seeAll, setSeeAll ] = useState(false)
    const [ scans, setScans ] = useState()
    let imageUrl = DefaultImage

    // Search Manga Image
    if(manga){
        const imageData = manga.relationships.find((relation) => relation.type === "cover_art")
        if(imageData){
            imageUrl = `https://uploads.mangadex.org/covers/${productId}/${imageData.attributes.fileName}.512.jpg`
        }
    }

    useEffect(() => {
        setIsLoading(true)
        getManga({category, productId, setManga, setIsLoading, setChapters, setSliceChapters, setScans});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSeeAll(validator) {
        validator ?
            setSliceChapters(chapters)
        :
            setSliceChapters(chapters.slice(0, 10))
        setSeeAll(validator)
    }

    return (
        <GridContainer id="GridContainer" container>
            {isLoading ?
                <Loading />
            :
                <>
                    <InfoSection container direction="row">
                        <Image src={imageUrl} alt={"Book Portrait"} />
                        <DetailSection>
                            <TextInfo title='true'>{manga.attributes.title.en}</TextInfo>
                            <TextInfo>{manga.attributes.description.en}</TextInfo>
                            <LabelInfo>Géneros</LabelInfo>
                            <Grid container direction="row">
                                {manga.attributes.tags.map((gen, index) => (
                                    <TextInfo
                                        key={index}
                                        genres='true'
                                    >
                                        {gen.attributes.name.en}
                                    </TextInfo>
                                ))}
                            </Grid>
                            <LabelInfo>Estado</LabelInfo>
                            <TextInfo>{manga.attributes.status}</TextInfo>
                            <LabelInfo>Títulos Alternativos</LabelInfo>
                            <Grid container direction="row">
                                {manga.attributes.altTitles.map((alt, index) => (
                                    <TextInfo
                                        key={index}
                                        alt='true'
                                    >
                                        {Object.values(alt)}
                                    </TextInfo>
                                ))}
                            </Grid>
                        </DetailSection>
                    </InfoSection>
                    <Grid container
                        id="SectionContainer"
                        alignItems="center"
                        direction="column"
                    >
                        <ChapterContainer>
                        <TextInfo title='true'>SECCION DE CAPITULOS:</TextInfo>
                            {sliceChapters.map((chap, index) => (
                                <Link style={{textDecoration: 'none'}} to={`/${category}/${chap.id}/${scans[0].id}/page=${chap.index}`}>
                                    <ChapterRow
                                        container
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        {chap.name}
                                        <ExpandMoreIcon />
                                    </ChapterRow>
                                </Link>
                            ))}
                            <ChapterRow
                                container
                                justifyContent="center"
                                alignItems="center"
                                end='true'
                                onClick={() => handleSeeAll(!seeAll)}
                            >
                                Ver Todo
                            </ChapterRow>
                        </ChapterContainer>
                    </Grid>
                </>
            }
        </GridContainer>
    );
}

export default ProductView;