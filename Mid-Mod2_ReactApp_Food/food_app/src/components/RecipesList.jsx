import React, { Component } from 'react';
import Header from './Header';
import recipeTypes from './recipeTypes';

class Recipes extends Component {
    constructor() {
        super()

        this.state = {
            lunch:"",
            dinner:"",
            snack:"",
        }
    }
    componentDidMount() {
        // list all of the recipes
        
        for (index = 0; index < 4; index++){
            
        }

    }

    render() {
        return (
            <div className="recipesListContainer">
                <Header />

            </div>
        );
    }
}

export default Recipes;