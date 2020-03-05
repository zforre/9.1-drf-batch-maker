import React, {Component} from 'react';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class RecipeForm extends Component {
    constructor(props) {
        super(props);
            this.state = {
                recipes: [],
                title: '',
                description: ''
            }

            this.handleInput = this.handleInput.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`api/v1/`)
          .then(response => this.setState({recipes: response.data}))
          .catch(error => console.log(error));
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("image", this.state.image);

    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} className='row no-gutters'>
                <div className='form-group col-12'>
                    <label htmlFor='text'>What's the recipe's name?</label>
                    <input className="form-control" type="text" name="text" id="text" value={this.state.title} onChange={this.handleInput} />
                </div>
                <button className='btn btn-primary'>Add</button>
            </form>
        )
    }
}

export default RecipeForm