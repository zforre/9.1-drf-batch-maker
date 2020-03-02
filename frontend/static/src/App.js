import React,{Component} from 'react';
import './App.css';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    axios.get(`api/v1/`)
      .then(response => this.setState({recipes: response.data}))
      .catch(error => console.log(error));
  }

  render() {
    console.log(this.state)
    return(
      <h1>I am the Batch Maker App</h1>
      

    )
  }
}

export default App;
