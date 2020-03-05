import React, {Component} from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class RecipesList extends Component {
    constructor(props) {
        super(props);
            this.state = {
                recipes: [],
                title: '',
                description: '',
                image: null,
                preview: null,
                is_public: true,
                recipe_type: "",
                prep_time: "",
                cook_time: "",
                cook_temp: 1,
                directions: "",
            }
    }

    componentDidMount() {
        axios.get("/api/v1/")
        .then(result => {
            this.setState({recipes: result.data})
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return(
            <div>
                <h1>I am the List App</h1>
                <ul>
                    {this.props.recipes.map(recipe => 
                    <li className="card mt-5" key={recipe.id}> 
                        <img src={recipe.image} className="card-img-top" alt="Uploaded Photo"></img>
                        <div className="card-body">
                            <h2 className="card-title">{recipe.title}</h2> 
                            <p className="card-text">{recipe.description}</p>
                        </div>
                    </li>)}
                </ul>
            </div>
        )
    }
}

export default RecipesList