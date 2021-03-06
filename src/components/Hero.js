import React from 'react';

const Hero = ({handleLogOut}) => {
    return(
        <div>
            <div>
                <h2>Welcome</h2>
            </div>
            <div>
                <button onClick={handleLogOut}>Logout</button>
            </div>
        </div>
    )
}

export default Hero;