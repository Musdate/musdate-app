import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { db } from '../firebase';
import styled from 'styled-components';

const Image = styled.img`
    width: 100%;
`

const getMangas = async (category, productId, setManga, setIsLoading, setChapters) => {
    await db.collection(category)
        .where('productId', '==', productId)
        .get()
        .then(doc => {
            setManga(doc.docs[0].data())

            db.collection(`${category}_chapters`)
                .where('productId', '==', productId)
                .orderBy('index')
                .get()
                .then(querySnapshot => {
                    const chapters = []
                    querySnapshot.forEach(doc2 => {
                        chapters.push({id: doc2.id, ...doc2.data()})
                    });
                    setChapters(chapters)
                    setIsLoading(false)
                });

        });
}

function ProductView(props) {
    const { productId, category } = useParams();
    const [ manga, setManga ] = useState();
    const [ chapters, setChapters] = useState();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        getMangas(category, productId, setManga, setIsLoading, setChapters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ?
                <Grid style={{background: 'aquamarine', textAlign: 'center'}}>
                    <h1>LOADING...</h1>
                </Grid>
            :
                <>
                    <Grid container direction="row">
                        <Grid item xs={3} style={{padding: '30px'}}>
                            <Image src={manga.image} alt={"Book Portrait"} />
                        </Grid>
                        <Grid item xs={9} style={{padding: '0px 25px'}}>
                            <h1>{manga.title}</h1>
                            <p>{manga.description}</p>
                            <Grid container direction="row">
                                {manga.genres.map((gen, index) => (
                                    <div style={{marginRight: '20px'}}>
                                        <h4>{gen}</h4>
                                    </div>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid style={{textAlign: 'center'}}>
                        <h1>SECCION DE CAPITULOS:</h1>
                        {chapters.map((chap, index) => (
                            <Link to={`/${category}/${productId}/${chap.id}`}>
                                <div style={{background: 'aquamarine'}}>
                                    {chap.name}
                                </div>
                            </Link>
                        ))}
                    </Grid>
                </>
            }
        </>
    );
}

export default ProductView;