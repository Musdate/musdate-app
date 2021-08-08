import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import mangas from '../TuMangaOnline-20210805-23.json'

const GridBox = styled(Grid)`
    width: 250px;
    height: 350px;
    background-image: url(${props => props.image});
`
const Titulo = styled.p`
    color: black;
`
const Main = () => {

    let mangasSlices = mangas.slice(0,49)

    return (
        <Grid container>
            <Grid container direction="row" justifyContent="space-around">
                <h1>Populares</h1>
                <h1>Otros</h1>
                <h1>Otros</h1>
            </Grid>
            <Grid container justifyContent="space-around" spacing={5}>
                {mangasSlices.map((p, index) =>
                   <GridBox item image={p.product.image} />
                )}
            </Grid>
        </Grid>
    );
}

export default Main;