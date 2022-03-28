import React, { useEffect, useState } from "react";
import { toDecimal, toVulgar } from 'vulgar-fractions';
import './AddIngredientsButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const AddIngredientsButton = (props) => {
    const [servings, setServings] = useState(1);
    const [previousServings, setPreviousServings] = useState(1);
    let quantities = {};
    let quantitiesSet = false;
    let endingIndexOfValue = -1;
    let startingIndexOfValue = -1;

    const setEndingIndexOfValue = (newVal) => endingIndexOfValue = newVal;
    const setStartingIndexOfValue = (newVal) => startingIndexOfValue = newVal;

    const floatRegExp = new RegExp('^([0-9]+([.][0-9]*)?|[.][0-9]+)$');

    useEffect(() => {
        let currentIngredients = props.ingredients.slice();
        // Note: Can't use for...in here
        for (let i = 0; i < props.ingredients.length; i++) {
            const currentIngredient = props.ingredients[i];
            const quantity = getQuantityFromIngredient(currentIngredient);
            if (!quantitiesSet) quantities[currentIngredient] = quantity;
            console.log(quantities[currentIngredient]);

            const newQuantity = servings >= previousServings ? servings * quantities[currentIngredient] : quantities[currentIngredient] / servings;
            
            setNewQuantity(currentIngredient, newQuantity, i, currentIngredients);
        }
        quantitiesSet = true;
        props.setIngredients(currentIngredients);
        setPreviousServings(servings);
    }, [servings]);

    const setNewQuantity = (ingredient, newQuantity, index, currentIngredients) => {
        if (endingIndexOfValue !== -1) {
            let result = "";
            
            if (newQuantity < 1 && typeof toVulgar(newQuantity % 1) === 'undefined') result += 0;
            else if (newQuantity >= 1) result += Math.floor(newQuantity);
            
            if (typeof toVulgar(newQuantity % 1) !== 'undefined' && result.length === 0) result += toVulgar(newQuantity % 1);
            else if (typeof toVulgar(newQuantity % 1) !== 'undefined') result += " " + toVulgar(newQuantity % 1);
            else result = parseInt(result) + (newQuantity % 1);

            const newIng = ingredient.substring(0, startingIndexOfValue) + result + ingredient.substring(endingIndexOfValue);

            if (newQuantity % 1 > 0 && ingredient.substring(startingIndexOfValue, endingIndexOfValue - 1).includes("/")) {
                // TODO - handle denominators > 9
                setEndingIndexOfValue(startingIndexOfValue + result.toString().length + 2);
            }
            else setEndingIndexOfValue(startingIndexOfValue + result.toString().length);

            currentIngredients.splice(index, 1, newIng);
        }
    }

    const getQuantityFromIngredient = (ingredient) => {
        let value = 0;
        let index = 0;

        // Need to reset indices to -1 for each ingredient
        endingIndexOfValue = -1;
        startingIndexOfValue = -1;

        // IMPORTANT: Contents below are temp. copied from CartItem.js, but should be pulled into own file

        // Find the first-occurring numeric value
        while (index < ingredient.length && typeof toDecimal(ingredient.charAt(index)) === 'undefined' && (ingredient.charAt(index) < '0' || ingredient.charAt(index) > '9')) {
            index++;
        }

        // If index is too big, no numbers in ingredient so we return 1
        // TODO - disable quantity adjustor in this case
        if (index >= ingredient.length) {
            return 1;
        }

        setStartingIndexOfValue(index);

        // Handle unicode fractions < 1
        if (toDecimal(ingredient.charAt(index)) && toDecimal(ingredient.charAt(index)) > 0) {
            if (endingIndexOfValue === -1) setEndingIndexOfValue(index + 1);
            return toDecimal(ingredient.charAt(index));
        }

        // Handle integers
        while (index < ingredient.length && (ingredient.charAt(index) >= '0' && ingredient.charAt(index) <= '9')) {
            value = parseInt(value) * 10;
            value = parseInt(value) + parseInt(ingredient.charAt(index));
            index++;
        }

        // TODO - handle case where next character is unicode fraction as well (no space)

        if (ingredient.charAt(index) === '/') {
            // Handle non-unicode fractions < 1
            // value is now numerator
            let denominator = 0;
            index++;
            while (index < ingredient.length && (ingredient.charAt(index) >= '0' && ingredient.charAt(index) <= '9')) {
                denominator = parseInt(denominator) * 10;
                denominator = parseInt(denominator) + parseInt(ingredient.charAt(index));
                index++;
            }
            value = value / denominator;
        } else if (ingredient.charAt(index) === ' ') {
            // Handle unicode fractions > 1
            if (toDecimal(ingredient.charAt(index + 1)) && toDecimal(ingredient.charAt(index + 1)) > 0) {
                index++;
                value = value + toDecimal(ingredient.charAt(index));
                index++;
            } else {
                // Handle non-unicode fractions > 1
                let numerator = 0;
                index++;

                while (index < ingredient.length && (ingredient.charAt(index) >= '0' && ingredient.charAt(index) <= '9')) {
                    numerator = parseInt(numerator) * 10;
                    numerator = parseInt(numerator) + parseInt(ingredient.charAt(index));
                    index++;
                }

                if (ingredient.charAt(index) === '/') {
                    let denominator = 0;
                    index++;
                    while (index < ingredient.length && (ingredient.charAt(index) >= '0' && ingredient.charAt(index) <= '9')) {
                        denominator = parseInt(denominator) * 10;
                        denominator = parseInt(denominator) + parseInt(ingredient.charAt(index));
                        index++;
                    }
                    value = value + numerator / denominator;
                } else index--;
            }
        } else if (ingredient.charAt(index) === '.') {
            // Handle decimals
            index++;
            let decimal = 0;

            while (index < ingredient.length && (ingredient.charAt(index) >= '0' && ingredient.charAt(index) <= '9')) {
                decimal = parseInt(decimal) * 10;
                decimal = parseInt(decimal) + parseInt(ingredient.charAt(index));
                index++;
            }

            const divisor = Math.pow(10, decimal.toString().length);
            value = value + decimal / divisor;
        }
        
        setEndingIndexOfValue(index);
        return value;
    }

    const handleServingsChange = (event) => {
        setServings(event.target.value);
    }

    const onServingsBlur = (event) => {
        if(!event.target.value.match(floatRegExp)) setServings(0);
    }

    const roundToQuarter = (num) => {
        return (Math.round(num * 4) / 4);
    }

    const incrementServings = () => {
        const currentServings = Number(servings);
        let newServings = 0.0;

        if (currentServings >= 5.0) {
            newServings = currentServings + 1.0;
        } else if (currentServings >= 1.0) {
            newServings = currentServings + 0.5;
        } else {
            newServings = currentServings + 0.25;
        }

        setServings(roundToQuarter(newServings));
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

        if (newServings < 0.0) setServings(0); // Catch any negatives
        else setServings(roundToQuarter(newServings));
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