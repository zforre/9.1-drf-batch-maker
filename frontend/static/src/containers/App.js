import React,{Component} from 'react';
import RecipesList from '../components/RecipesList.js'
// import RecipeForm from '../components/RecipeForm.js'
import './App.css';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      recipes: [],
      
    }
  }

  componentDidMount() {
    axios.get(`api/v1/`)
      .then(response => this.setState({recipes: response.data}))
      .catch(error => console.log(error));
  }

  render() {
    console.log(this.state.recipes)
    return(
      <div>
        <h1>This is the Home Page</h1>
        <RecipesList recipes = {this.state.recipes}/>
      </div>
      

    )
  }
}

export default App;
