import React, { useState } from "react";
import './AddIngredientsButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const AddIngredientsButton = (props) => {
    const [servings, setServings] = useState(1);

    const handleServingsChange = (event) => {
        // Parse text (event.target.value) and set servings
    }

    // TODO - move these into separate file to eliminate duplicate code

    const saveRecipe = () => {
        let currentRecipes = props.savedRecipes.slice();
        currentRecipes.push(props.recipe);
        localStorage.setItem('savedRecipes', JSON.stringify(currentRecipes));
        props.setSavedRecipes(currentRecipes);
    }

    const handleButtonClick = () => {
        let currentIngredients = props.savedIngredients.slice();
        const newIngredientList = [...currentIngredients, ...JSON.parse(props.recipe.Cleaned_Ingredients.replace(/"/g, ' inch').replace(/'/g, '"'))];
        props.setSavedIngredients(newIngredientList);
        localStorage.setItem('savedIngredients', JSON.stringify(newIngredientList));
        if (!props.recipeSaved) saveRecipe();
        props.setRecipeSaved(true);
    }

    return(
        <div className="addIngredientsButtonContainer">
            <div className="servings">
                <input className="input" type="text" placeholder="Enter text." onChange={handleServingsChange} value={servings}></input>
            </div>
            <div className="servingsArrows">
                <FontAwesomeIcon icon={faAngleDown} size="lg"/>
                <FontAwesomeIcon icon={faAngleUp} size="lg"/>
            </div>
            <div className="cartIcon">
                <FontAwesomeIcon icon={faCartPlus} onClick={handleButtonClick} size="1x"/>
            </div>
        </div>
    );
}

export default AddIngredientsButton;