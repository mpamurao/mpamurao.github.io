import React from 'react';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

function Header() {
    return (
        <div className="headerContainer">
            <div className="pageName">
                Dish It Out
            </div>
            <SearchBar />
            <NavBar />
        </div>
    );
}

export default Header;