import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { db } from '../firebase';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import Loading from './Loading';

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
    ${props => props.isEnd &&
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

const getMangas = async (props) => {
    const {
        category,
        productId,
        setManga,
        setIsLoading,
        setChapters,
        setSliceChapters,
        setScans
    } = props

    await db.collection(category)
        .where('productId', '==', productId)
        .get()
        .then(mangaDoc => {
            setManga(mangaDoc.docs[0].data())

            db.collection(`${category}_chapters`)
                .where('productId', '==', productId)
                .orderBy('index')
                .get()
                .then(snapshotDoc => {
                    const chapters = []
                    snapshotDoc.forEach(chapterDoc => {
                        chapters.push({id: chapterDoc.id, ...chapterDoc.data()})

                        db.collection(`${category}_chapters`)
                            .doc(chapterDoc.id)
                            .collection('scans')
                            .get()
                            .then(scanDoc => {
                                const scansChaps = []
                                scanDoc.forEach(doc => {
                                    scansChaps.push({id: doc.id, ...doc.data()})
                                })
                                setScans(scansChaps)
                                setIsLoading(false)
                            });


                    });
                    setChapters(chapters)
                    setSliceChapters(chapters.slice(0, 10))
                });
        });
}

/*
<Link style={{textDecoration: 'none'}} to={`/${category}/${productId}/${chap.id}`}>
    <ChapterRow>
        {chap.name}
    </ChapterRow>
</Link>
*/

function ProductView(props) {
    const { productId, category } = useParams();
    const [ manga, setManga ] = useState();
    const [ chapters, setChapters] = useState();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ sliceChapters, setSliceChapters ] = useState([]);
    const [ seeAll, setSeeAll ] = useState(false)
    const [ scans, setScans ] = useState()

    useEffect(() => {
        setIsLoading(true)
        getMangas({category, productId, setManga, setIsLoading, setChapters, setSliceChapters, setScans});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function handleSeeAll(validator) {
        validator ?
            setSliceChapters(chapters)
        :
            setSliceChapters(chapters.slice(0, 10))
        setSeeAll(validator)
    }

    // function handleChapter(validator) {
    //     //Function Here
    // }

    return (
        <>
            {isLoading ?
                <Loading />
            :
                <>
                    <InfoSection container direction="row">
                        <Image src={manga.image} alt={"Book Portrait"} />
                        <DetailSection>
                            <TextInfo title={true}>{manga.title}</TextInfo>
                            <TextInfo>{manga.description}</TextInfo>
                            <LabelInfo>Géneros</LabelInfo>
                            <Grid container direction="row">
                                {manga.genres.map((gen, index) => (
                                    <TextInfo genres={true}>{gen}</TextInfo>
                                ))}
                            </Grid>
                            <LabelInfo>Estado</LabelInfo>
                            <TextInfo>{manga.status}</TextInfo>
                            <LabelInfo>Títulos Alternativos</LabelInfo>
                            <Grid container direction="row">
                                {manga.alt_title.map((alt, index) => (
                                    <TextInfo alt={true}>{alt}</TextInfo>
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
                        <TextInfo title={true}>SECCION DE CAPITULOS:</TextInfo>
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
                                isEnd={true}
                                onClick={() => handleSeeAll(!seeAll)}
                            >
                                Ver Todo
                            </ChapterRow>
                        </ChapterContainer>
                    </Grid>
                </>
            }
        </>
    );
}

export default ProductView;