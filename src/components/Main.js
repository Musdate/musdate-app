import React from 'react';
import { useHistory } from 'react-router';
import { Grid, Row } from 'react-flexbox-grid';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Main = () => {
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    async function handleLogout() {
        await logout()
        history.push("/login")
    }

    return (
        <Grid>
            <Row center="xs">
                <h2>Welcome {currentUser.email}</h2>
            </Row>
            <Row center="xs">
                <Link to="/update-profile">Update Profile</Link>
            </Row>
            <Row center="xs">
                <button onClick={handleLogout}>Logout</button>
            </Row>
        </Grid>
    );
}

export default Main;