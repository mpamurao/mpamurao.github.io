import React, { Component } from 'react';

class Recipe extends Component {
    constructor() {
        super()

        this.state={
            meals:"",
        }
    }
    
    componentDidMount = async () => {
        // object destructuring
        // const {recipe} is same as this.props.match.params.recipe

        // https://reactrouter.com/web/api/match
        // recipe value comes from Router in App.js where dynamic values  are parsed from URL into matched key/value pairs
        // path="/recipes/:recipe" will create dynamic key called recipe and its value (the actual recipe word) added to .match.params
        const {recipe} = this.props.match.params;
        
        try{
            const response = await fetch(`www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`);

            console.log(response)

            this.setState({meals:response.strMeal});
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