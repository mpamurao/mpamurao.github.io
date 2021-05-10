import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navBar">
            <div className="navItem"><Link to="/"> Home </Link></div>
            <div className="navItem"><Link to="/recipes"> Recipes </Link></div>
        </div>
    );
};

export default NavBar;