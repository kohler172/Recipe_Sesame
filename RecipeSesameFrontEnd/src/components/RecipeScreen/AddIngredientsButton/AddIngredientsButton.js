import React, { useState } from "react";
import './AddIngredientsButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const AddIngredientsButton = (props) => {
    const [servings, setServings] = useState(1);

    const floatRegExp = new RegExp('^([0-9]+([.][0-9]*)?|[.][0-9]+)$');

    const handleServingsChange = (event) => {
        setServings(event.target.value);
    }

    const onServingsBlur = (event) => {
        if(!event.target.value.match(floatRegExp)) setServings(0);

        // TODO - update value saved in state and localStorage
    }

    const incrementServings = () => {
        const currentServings = Number(servings);
        if (currentServings >= 5.0) {
            setServings(currentServings + 1.0);
        } else if (currentServings >= 1.0) {
            setServings(currentServings + 0.5);
        } else {
            setServings(currentServings + 0.25);
        }
    }

    const decrementServings = () => {
        const currentServings = Number(servings);
        let newServings = 0.0;
        if (currentServings > 5.0) {
            newServings = currentServings - 1.0;
        } else if (currentServings > 1.0) {
            newServings = currentServings - 0.5;
        } else {
            newServings = currentServings - 0.25;
        }
        if (newServings < 0.0) setServings(0.0); // Catch any negatives
        else setServings(newServings);
    }

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
            <div className="servingsArrows">
                <FontAwesomeIcon icon={faAngleDown} onClick={decrementServings} size="lg"/>
                <div className="servings">
                    <input className="input" type="text" onChange={handleServingsChange} onBlur={onServingsBlur} value={servings}></input>
                </div>
                <FontAwesomeIcon icon={faAngleUp} onClick={incrementServings} size="lg"/>
            </div>
            <div className="cartIcon">
                <FontAwesomeIcon icon={faCartPlus} onClick={handleButtonClick} size="1x"/>
            </div>
        </div>
    );
}

export default AddIngredientsButton;