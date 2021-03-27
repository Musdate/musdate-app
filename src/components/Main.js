import React from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const Main = () => {
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    async function handleLogout() {
        await logout()
        history.push("/login")
    }
    return(
        <Grid>
            <Row center="xs">
                <h2>Welcome {currentUser.email}</h2>
            </Row>
            <Row center="xs">
                <button onClick={handleLogout}>Logout</button>
            </Row>
        </Grid>
    )
}

export default Main;