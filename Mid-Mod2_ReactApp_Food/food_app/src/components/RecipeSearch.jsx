import React, { Component } from 'react';
import config from '../config';
import data from './dummydata';
import Recipe from './Recipe';
import Grid from '@material-ui/core/Grid';
import {Box} from '@material-ui/core';
import Header from './Header';







class RecipeSearch extends Component {
    constructor() {
        super()

        this.state={
            meals:[],
            data,
        }
    }
    
    
    componentDidMount = async () => {
        // get API keys from config.js
        const apiKey = config.edamam.key;
        const apiID = config.edamam.ID;

        // object destructuring
        // const {recipe} is same as this.props.match.params.recipe

        // https://reactrouter.com/web/api/match
        // recipe value comes from Router in App.js where dynamic values  are parsed from URL into matched key/value pairs
        // path="/recipes/:recipe" will create dynamic key called recipe and its value (the actual recipe word) added to .match.params
        const {recipe} = this.props.match.params;
        
        try{
            // LIMITED 10,000 calls per month
            // const response = await fetch(`https://api.edamam.com/search?q=${recipe}&app_id=${apiID}&app_key=${apiKey}`);
            // const data = await response.json();
            // console.log(response)
            
            const meals = data.hits.map((index) => {
                return index.recipe;
            })

            this.setState({meals});       
        }
        catch(err){
            console.log(err)
        }

        
    }


    render() {
        {console.log(this.state.meals)};
        return (
            <div className="searchResultsContainer">
                <Header />
                <Box m={3}>
                    <Grid container className="searchResultsGrid" spacing={4} justify="center">
                        {this.state.meals.map((meal, index) => {
                            if (!meal.dishType || !meal.mealType ){
                                return;
                            }
                            return <Grid item key={`${meal.label}-${index}`}><Recipe meal={meal} /></Grid>
                        })} 
                    </Grid>
                </Box>
            </div>
        );
    }
}

export default RecipeSearch;