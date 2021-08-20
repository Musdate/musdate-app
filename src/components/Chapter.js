import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';

const getChapters = async (category, productId, setIsLoading, index, setChapter) => {
    await db.collection(`${category}_chapters`)
        .doc(index)
        .collection('scans')
        .get()
        .then(snapshot => {
            setChapter(snapshot.docs[0].data())
            setIsLoading(false)
        })
}

function Chapter(props) {
    const { productId, category, index } = useParams();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ chapter, setChapter ] = useState();

    useEffect(() => {
        setIsLoading(true)
        getChapters(category, productId, setIsLoading, index, setChapter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ?
                <Grid container alignItems="center" style={{background: 'aquamarine', textAlign: 'center'}}>
                    <h1>LOADING...</h1>
                </Grid>
            :
                <div>
                    {chapter.images.map((image, index) => (
                        console.log(chapter),
                        <div>
                            <img src={image} />
                        </div>
                    ))}
                </div>
            }
        </>
    );
}

export default Chapter;