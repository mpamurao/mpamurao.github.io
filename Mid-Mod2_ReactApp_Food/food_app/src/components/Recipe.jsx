import React, { Component } from 'react';
import config from '../config';

class Recipe extends Component {
    constructor() {
        super()

        this.state={
            meals:"",
        }
    }
    
    componentDidMount = async () => {
        const apiKey = config.spoonacular;
        // object destructuring
        // const {recipe} is same as this.props.match.params.recipe

        // https://reactrouter.com/web/api/match
        // recipe value comes from Router in App.js where dynamic values  are parsed from URL into matched key/value pairs
        // path="/recipes/:recipe" will create dynamic key called recipe and its value (the actual recipe word) added to .match.params
        const {recipe} = this.props.match.params;
        
        try{
            // LIMITED API CALLS PER DAY
            // const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=${apiKey}&query=banana`);
            // const data = await response.json();
            // console.log(response)
            // console.log(data)
            console.log(recipe)
      


            // this.setState({meals:response.strMeal});
            // console.log(data[0].strMeal);
        }
        catch(err){
            console.log(err)
        }

    }

    render() {
        const {recipe} = this.props.match.params;
        
        return (
            <div className="recipeContainer">
                HELLO! {recipe}
            </div>
        );
    }
}

export default Recipe;