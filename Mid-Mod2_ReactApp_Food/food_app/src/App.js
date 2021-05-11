import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import RecipesList from './components/RecipesList';
import RecipeSearch from './components/RecipeSearch';

// https://developer.edamam.com/edamam-docs-recipe-api

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/recipes" component={RecipesList} />
          {/* :recipe shows that the value for recipe is dynamic */}
          <Route path="/search/:recipe" component={RecipeSearch} />
          <Route path="*" render={() => {return <div>404 ERROR NOT FOUND</div>}} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
