import React, { Component } from 'react';
import { withRouter } from 'react-router';

class SearchBar extends Component {
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
    
        // refresh the page after url has been changed to get API query
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div className="searchBarContainer">
                    <label htmlFor="searchBar">
                        <input id="searchBar" type="text" placeholder="Search recipe..."  value={this.state.userInput} onChange={this.handleChange} onKeyPress={this.keyPress}/>
                    </label>
                </div>
            </div>
        );
    }
}

// connect SearchBar component to router in order to get access to history
export default withRouter(SearchBar);