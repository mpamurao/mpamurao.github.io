import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';

// https://spoonacular.com/food-api/docs

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/recipes" component={Recipes} />
          {/* :recipe shows that the value for recipe is dynamic */}
          <Route path="/recipes/:recipe" component={Recipe} />
          <Route path="*" render={() => {return <div>404 ERROR NOT FOUND</div>}} />

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
