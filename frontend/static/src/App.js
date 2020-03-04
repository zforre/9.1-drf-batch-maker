import React,{Component} from 'react';
import './App.css';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      recipes: [],
      title: '',
      description: ''
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
        <h1>I am the Batch Maker App</h1>
        <ul>
          {this.state.recipes.map(recipe => <li>{recipe.title}</li>)}
        </ul>
      </div>
      

    )
  }
}

export default App;
