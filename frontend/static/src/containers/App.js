import React,{Component} from 'react';
import RecipesList from '../components/RecipesList.js'
import RecipeForm from '../components/RecipeForm.js'
import './App.css';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      recipes: [],
      showComponent: 'home'
    }
    this.addRecipe = this.addRecipe.bind(this);
  }

  componentDidMount() {
    axios.get(`api/v1/`)
      .then(response => this.setState({recipes: response.data}))
      .catch(error => console.log(error));
  }

  addRecipe(recipe) {
    let recipes = [...this.state.recipes];
    recipes.push(recipe)
  }

  render() {
    console.log(this.state.recipes)
    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Batch Maker</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <button className="btn nav-link" href="#" onClick={() => this.setState({showComponent: 'recipes'})}>Recipes</button>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => this.setState({showComponent: 'create a recipe'})}>Create a Recipe</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Sign Up</a>
              </li>
              </ul>
          </div>
        </nav>
        <h1>This is the Home Page</h1>



    { this.state.showComponent === 'recipes' && <RecipesList recipes = {this.state.recipes}/> }

    { this.state.showComponent === 'create a recipe' && <RecipeForm recipes ={this.state.recipes}/> }
       
      </div>
      

    )
  }
}

export default App;
