import React, {Component} from 'react';

class RecipesList extends Component {
    constructor(props) {
        super(props);
            this.state = {
                recipes: [],
                title: '',
                description: ''
            }
    }

    render() {
        return(
            <div>
                <h1>I am the List App</h1>
                <ul>
                    {this.props.recipes.map(recipe => 
                    <li key={recipe.id}> 
                        <h2>{recipe.title}</h2> 
                        <p>{recipe.description}</p>
                    </li>)}
                </ul>
            </div>
        )
    }
}

export default RecipesList