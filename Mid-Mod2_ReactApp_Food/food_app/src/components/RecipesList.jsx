import React, { Component } from 'react';
import Header from './Header';
import recipeTypes from './recipeTypes';
import config from '../config';
import Grid from '@material-ui/core/Grid';
import {Box} from '@material-ui/core';
import Recipe from './Recipe';
// import data from './dummydata';

class Recipes extends Component {
    constructor() {
        super()

        this.state = {
            Lunch:[],
            Dinner:[],
            Snack:[],
            Teatime:[],
            resultExists:true,
        }
    }

    componentDidMount = async () => {
        // list all of the recipes for lunch, dinner, snack
        
        for (let index = 0; index < 4; index++){
            console.log(recipeTypes[index]);
            this.fetchRecipes(recipeTypes[index]);
        }
    }

    fetchRecipes = async (recipe) => {
        // get API keys from config.js
        const apiKey = config.edamam.key;
        const apiID = config.edamam.ID;

        // object destructuring
        // const {recipe} is same as this.props.match.params.recipe

        // https://reactrouter.com/web/api/match
        // recipe value comes from Router in App.js where dynamic values  are parsed from URL into matched key/value pairs
        // path="/recipes/:recipe" will create dynamic key called recipe and its value (the actual recipe word) added to .match.params
        console.log("fetchRecipe", recipe)
        try{
            // LIMITED 10,000 calls per month
            const response = await fetch(`https://api.edamam.com/search?q=${recipe}&app_id=${apiID}&app_key=${apiKey}`);
            const data = await response.json();
            console.log(data.count)
            if (data.count === 0){
                this.setState({resultExists:false});
                return
            }
            
            const meals = data.hits.map((index) => {
                return index.recipe;
            })
            console.log("meals", meals);
            this.setState({[recipe]:meals});
        }
        catch(err){
            console.log(err)
        }
    }

    render() {
        return (
            <div className="recipesListContainer">
                {/* {console.log(this.state.Lunch)} */}
                <Header />

                {!this.state.resultExists 
                    ? <h3 className="noResults">No results found</h3>
                    : (<div> <Box m={3}>
                            <Grid container className="searchResultsGrid" spacing={4} justify="center">
                                {this.state.Lunch.map((meal, index) => {
                                    if (!meal.dishType || !meal.mealType ){
                                        return;
                                    }
                                    return <Grid item key={`${meal.label}-${index}`}><Recipe meal={meal} /></Grid>
                                })} 
                            
                                {this.state.Dinner.map((meal, index) => {
                                    if (!meal.dishType || !meal.mealType ){
                                        return;
                                    }
                                    return <Grid item key={`${meal.label}-${index}`}><Recipe meal={meal} /></Grid>
                                })} 

                                {this.state.Snack.map((meal, index) => {
                                    if (!meal.dishType || !meal.mealType ){
                                        return;
                                    }
                                    return <Grid item key={`${meal.label}-${index}`}><Recipe meal={meal} /></Grid>
                                })} 

                                {this.state.Teatime.map((meal, index) => {
                                    if (!meal.dishType || !meal.mealType ){
                                        return;
                                    }
                                    return <Grid item key={`${meal.label}-${index}`}><Recipe meal={meal} /></Grid>
                                })} 
                            </Grid>
                        </Box>
                    </div>)
                }
            </div>
        );
    }
}

export default Recipes;