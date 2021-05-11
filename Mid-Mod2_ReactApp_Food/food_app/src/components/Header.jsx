import React from 'react';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

function Header(props) {
    return (
        <div className="headerContainer">
            <div className="pageName">
                Find A Meal
            </div>
            <SearchBar />
            <NavBar />
        </div>
    );
}

export default Header;