import { Grid } from '@material-ui/core';
import React from 'react';

function ProductView(props) {
    return (
        <Grid container direction="row">
            <Grid xs={3} style={{background: 'aquamarine'}}>
                hola
            </Grid>
            <Grid xs={9} style={{background: 'pink'}}>
                chao
            </Grid>
        </Grid>
    );
}

export default ProductView;