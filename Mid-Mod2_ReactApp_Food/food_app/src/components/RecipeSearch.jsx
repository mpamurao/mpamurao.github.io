import React, { Component } from 'react';
import config from '../config';
import Recipe from './Recipe';
import Grid from '@material-ui/core/Grid';
import {Box} from '@material-ui/core';
import Header from './Header';
// import data from './dummydata';

class RecipeSearch extends Component {
    constructor() {
        super()

        this.state = {
            meals:[],
            data: "",
            resultExists:true,
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
        console.log(recipe)
        try{
            // LIMITED 10,000 calls per month
            const response = await fetch(`https://api.edamam.com/search?q=${recipe}&app_id=${apiID}&app_key=${apiKey}`);
            const data = await response.json();

            if (data.count === 0){
                this.setState({resultExists:false});
                return
            }
            
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
        // {console.log(this.state.meals)};
        return (
            <div className="searchResultsContainer">
                <Header />

                {/* if query doesn't give results, state no results found. else show Grid components */}
                {!this.state.resultExists 
                    ? <h3 className="noResults">No results found</h3>
                    : (<Box m={3}>
                            <Grid container className="searchResultsGrid" spacing={4} justify="center">
                                {this.state.meals.map((meal, index) => {
                                    if (!meal.dishType || !meal.mealType ){
                                        return <div></div>;
                                    }
                                    return <Grid item key={`${meal.label}-${index}`} ><Recipe meal={meal} key={`${meal.label}-${index}`} /></Grid>
                                })} 
                            </Grid>
                        </Box>)
                }
            </div>
        );
    }
}

export default RecipeSearch;