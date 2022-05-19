import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GridContainer } from '../Globals/Grid';
import Loading from '../Globals/Loading';

function Movies(props) {
    const [ isLoading, setIsLoading ] = useState(true);

    return (
        <GridContainer>
            {isLoading ?
                <Loading />
            :
                <>
                    
                </>
            }
        </GridContainer>
    );
}

export default Movies;