import React from 'react';
import { Grid } from '@material-ui/core';
import { FadeLoader } from 'react-spinners';

function Loading(props) {
    return (
        <Grid container alignItems="center">
            <FadeLoader height={15} width={5} radius={2} color={"#527c8d"} css={'margin: auto;'} />
        </Grid>
    );
}

export default Loading;