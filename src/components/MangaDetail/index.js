import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import Loading from '../Loading';
import Chapters from './Chapters';
import InfoSection from './InfoSection';
import DefaultImage from '../../.images/DefaultImage.png'

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

    const pageReq = await fetch(`https://us-central1-musdate-react-app.cloudfunctions.net/api/detail/${productId}`)
    .catch(error => {
        //setError(error.message);
        setIsLoading(false);
    });
    await pageReq.json()
    .then(mangasData => {
        setManga(mangasData.data.data);
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
    const [ mangaImage, setMangaImage ] = useState(DefaultImage);
    const [ chapters, setChapters] = useState();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ sliceChapters, setSliceChapters ] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        getManga({productId, setManga, setIsLoading});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <GridContainer id="GridContainer" container>
            {isLoading ?
                <Loading />
            :
                <>
                    <InfoSection
                        manga={manga}
                        productId={productId}
                    />
                    <Chapters
                        sliceChapters={sliceChapters}
                        setSliceChapters={setSliceChapters}
                        category={category}
                        chapters={chapters}
                    />
                </>
            }
        </GridContainer>
    );
}

export default ProductView;