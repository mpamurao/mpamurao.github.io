import React, { Component } from 'react';
import './Home.css';
import {Button, Box} from '@material-ui/core';
import NavBar from './NavBar';
import recipeTypes from './recipeTypes';

class Home extends Component {
    constructor() {
        super()

        this.state = {
            userInput: "",
        }
    }

    handleChange = (event) => {
        this.setState({userInput: event.target.value});
    }

    keyPress = (event) => {
        // on enter in textbox, call submitForm to change URL
        if (event.key === "Enter"){
            this.submitForm();
        }
    }

    submitForm = () => {
        if (!this.state.userInput){
            return;
        }

        // change URL link by pushing to history
        this.props.history.push(`/search/${this.state.userInput}`);
    }

    randomRecipes = () => {
        const index = Math.floor(Math.random() * recipeTypes.length);
        this.props.history.push(`/search/${recipeTypes[index]}`);
    }

    render() {
        return (
            <div className="homePage">
                <NavBar />
                <div className="homeTitle">
                    Dish It Out
                
                    <div id="homeSearchForm">
                        <label htmlFor="homeSearchBar">
                            <input id="homeSearchBar" type="text" placeholder="Find recipes..." value={this.state.userInput} onChange={this.handleChange} onKeyPress={this.keyPress}/>
                        </label>

                        <div id="homeSearchButtons">
                            <Box m={1}>
                                <Button type="submit" variant="contained" title="Submit" style={{fontSize: '0.25em', fontWeight:"bold"}} 
                                onClick={this.submitForm}>
                                    Search
                                </Button>
                            </Box>
                            <Box m={1}>
                                <Button type="text" title="Randomly generate a meal" variant="contained" style={{fontSize: '0.25em', fontWeight:"bold"}} onClick={this.randomRecipes}>Indecisive and Hungry</Button>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;