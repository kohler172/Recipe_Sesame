import React from "react";
import './RecipeCartContents.css';

const RecipeCartContents = (props) => {
    return props.savedIngredients.length > 0 ? ( 
        <div className="recipeCartContents">
            { props.savedIngredients.map((item, index) => (
                <p>{item}</p>
            )) }
        </div>
    ) : (
        <div className="recipeCartContents centered">
            <p>Your basket is empty.</p>
        </div>
    );
}

export default RecipeCartContents;