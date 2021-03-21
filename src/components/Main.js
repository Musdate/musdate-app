import React from 'react';
import { Grid, Row } from 'react-flexbox-grid';

const Main = ({handleLogOut}) => {
    return(
        <Grid>
            <Row center="xs">
                <h2>Welcome</h2>
            </Row>
            <Row center="xs">
                <button onClick={handleLogOut}>Logout</button>
            </Row>
        </Grid>
    )
}

export default Main;