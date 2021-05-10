import React, { Component } from 'react';
import './Home.css';
import {Button, Box} from '@material-ui/core';

class Home extends Component {
    constructor() {
        super()

        this.state = {
            userInput: "",
        }
    }

    // enter user input into state which will show in textbox
    handleChange = (event) => {
        this.setState({userInput: event.target.value});
    }

    submitForm = () => {
        // change URL link by pushing to history
        this.props.history.push(`/recipes/${this.state.userInput}`);
    }

    keyPress = (event) => {
        // on enter in textbox, call submitForm to change URL
        if (event.key === "Enter"){
            this.submitForm();
        }
    }
    render() {
        return (
            <div className="homePage">
                <div className="homeTitle">
                    Find A Meal
                </div>
        
                <div id="homeSearchForm">
                    <label htmlFor="homeSearchBar">
                        <input id="homeSearchBar" type="text" placeholder="Search recipe..."  value={this.state.userInput} onChange={this.handleChange} onKeyPress={this.keyPress}/>
                    </label>

                    <div id="homeSearchButtons">
                        <Box m={1}>
                            <Button type="submit" variant="contained" title="Submit" style={{fontSize: '0.8em', fontWeight:"bold"}} onClick={this.submitForm}>Submit Recipe</Button>
                        </Box>
                        <Box m={1}>
                            <Button type="text" title="Randomly generate a meal" variant="contained" style={{fontSize: '0.8em', fontWeight:"bold"}}>Indecisive and Hungry</Button>
                        </Box>
                    </div>
                </div>
    
            </div>
        );
    }
}

export default Home;