import React, { Component } from 'react';
import config from '../config';
import data from './dummydata';

class Recipe extends Component {
    constructor() {
        super()

        this.state={
            meals:"",
            data,
        }
    }
    
    componentDidMount = async () => {
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
            console.log(data)

      


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