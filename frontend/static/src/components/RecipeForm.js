import React, {Component} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class RecipeForm extends Component {
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

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value})
    }

    handleImageChange(event){
        let file = event.target.files[0]
        this.setState({image: file});
        let reader = new FileReader();
        reader.onloadend = () => {
        this.setState({preview: reader.result});
        };

        reader.readAsDataURL(file);

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

    handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("image", this.state.image);

        axios.post("/api/v1/recipes/", formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        .then(res => {
            let recipes = [...this.state.recipes];
            recipes.push(res.data);

            this.setState({recipes: recipes, title: "", preview: null, image: null,});
        })
        .catch(error => {
            console.log(error)
        });

    }

    render() {
        let recipes = this.state.recipes.map(recipe => (
            <li key={recipe.id}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt=""/>
            </li>
        ))
        return(
            <React.Fragment>
                <form className="" onSubmit={this.handleSubmit}>
                    <div className="form-group col-3">
                        <label> Title</label>
                            <input type="text" name="title" className="form-control" value={this.state.title} onChange={this.handleChange}/>
                            <small className="form-text text-muted">This is the name of your recipe, make it special!</small>
                    </div>

                    <label> Image:
                        <input type="file" name="image" onChange={this.handleImageChange}/>
                    </label>

                   <Form.Check type="checkbox" name="is_public" class="form-check-label" checked={this.state.is_public} onChange={this.handleChange} label="public" />

                   <div className="form-group col-6">
                        <label>Prep Time
                            <input type="text" name="prep_time" className="form-control" value={this.state.prep_time} onChange={this.handleChange}/>
                        </label>
                    </div>

                    <div className="form-group col-6">
                        <label>Cook Time
                            <input type="text" name="cook_time" className="form-control" value={this.state.cook_time} onChange={this.handleChange}/>
                        </label>
                    </div>

                    <div className="form-group col-6">
                        <label>Cook Temp
                            <input type="number" name="cook_temp" className="form-control" value={this.state.cook_temp} onChange={this.handleChange}/>
                        </label>
                    </div>

                    <div className="form-group col-6">
                        <label>Directions
                            <input type="text" name="directions" className="form-control" value={this.state.directions} onChange={this.handleChange}/>
                        </label>
                    </div>


                    {this.state.image ? (
                        <img src={this.state.preview} alt="preview"/>
                    ) : (
                        null
                    )}

                    <button className="btn btn-primary">Add Recipe</button>
                </form>
                <ul>{recipes}</ul>
            </React.Fragment>
        )
    }
}

export default RecipeForm