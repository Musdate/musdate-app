import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';

const getChapters = async (category, chapId, scanId, chapIndex, setIsLoading, setChapter) => {
    await db.collection(`${category}_chapters`)
        .doc(chapId)
        .collection('scans')
        .doc(scanId)
        .get()
        .then(snapshot => {
            setChapter({...snapshot.data()})
            console.log('FLAG2', {...snapshot.data()})

        });
        setIsLoading(false)
}

function Chapter(props) {
    const { category, chapId, scanId, chapIndex } = useParams();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ chapter, setChapter ] = useState();

    useEffect(() => {
        setIsLoading(true)
        getChapters(category, chapId, scanId, chapIndex, setIsLoading, setChapter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ?
                <Loading />
            :
                <Grid container direction="column" alignItems="center">
                    {chapter.images.map((image, index) => (
                        <img src={image} alt={"Chapters of Book"} style={{maxWidth: '100%'}}/>
                    ))}
                </Grid>
            }
        </>
    );
}

export default Chapter;