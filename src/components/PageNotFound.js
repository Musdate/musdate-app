import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound(props) {
    return (
        <div>
            <h1>PAGE NOT FOUND !!</h1>
            <Link to='/'>Ir al inicio</Link>
        </div>
    );
}

export default PageNotFound;