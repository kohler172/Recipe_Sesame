import React, { useState } from "react";
import { toDecimal } from 'vulgar-fractions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './CartItem.css';
import QuantityAdjuster from "../QuantityAdjuster/QuantityAdjuster";

const CartItem = (props) => {
    const [endingIndexOfValue, setEndingIndexOfValue] = useState(-1);
    const [startingIndexOfValue, setStartingIndexOfValue] = useState(-1);

    const handleRecipeClick = () => {
        props.setOpenRecipe(props.item);
        props.setRecipeScreenIsOpen(true);
    }

    const removeRecipe = () => {
        let currentRecipes = props.savedRecipes.slice();

        const indexOfRec = currentRecipes.indexOf(props.item);
        if (indexOfRec !== -1) currentRecipes.splice(indexOfRec, 1);

        localStorage.setItem('savedRecipes', JSON.stringify(currentRecipes));
        props.setSavedRecipes(currentRecipes);
    }

    const removeIngredient = () => {
        let currentIngredients = props.savedIngredients.slice();

        const indexOfIng = currentIngredients.indexOf(props.item);
        if (indexOfIng !== -1) currentIngredients.splice(indexOfIng, 1);

        localStorage.setItem('savedIngredients', JSON.stringify(currentIngredients));
        props.setSavedIngredients(currentIngredients);
    }

    const getInitialQuantity = (ingredient) => {
        let value = 0;
        let index = 0;

        // Find the first-occurring numeric value
        while (index < ingredient.length && typeof toDecimal(ingredient.charAt(index)) === 'undefined' && (ingredient.charAt(index) < '0' || ingredient.charAt(index) > '9')) {
            index++;
        }

        // If index is too big, no numbers in ingredient so we return 1
        // TODO - disable quantity adjustor in this case
        if (index >= ingredient.length) {
            return 1;
        }

        if (startingIndexOfValue === -1) setStartingIndexOfValue(index);

        // Handle unicode fractions < 1
        if (toDecimal(ingredient.charAt(index)) && toDecimal(ingredient.charAt(index)) > 0) {
            return toDecimal(ingredient.charAt(index));
        }

        // Handle integers
        while (index < ingredient.length && (ingredient.charAt(index) >= '0' && ingredient.charAt(index) <= '9')) {
            value = parseInt(value) * 10;
            value = parseInt(value) + parseInt(ingredient.charAt(index));
            index++;
        }

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
                }
            }
        }
        
        if (endingIndexOfValue === -1) setEndingIndexOfValue(index);
        console.log(index);
        return value;
    }

    return props.itemType === 'recipe' ? (
        <div className="cartItem recipeItem">
            <div className="click" onClick={handleRecipeClick}></div>
            <img src={process.env.PUBLIC_URL + "/images/"  + props.item.Image_Name + ".jpg"} alt={props.item.Title} />
            <p>{props.item.Title}</p>
            <FontAwesomeIcon icon={faTrash} className="delete" onClick={removeRecipe}/>
        </div>
    ) : (
        <div className="cartItem cartIngredient">
            <p>{props.item}</p>
            <div className="ingredientButtons">
                <FontAwesomeIcon icon={faTrash} className="delete" onClick={removeIngredient}/>
                <QuantityAdjuster 
                    ingredient={props.item}
                    initialQuantity={getInitialQuantity(props.item)}
                    savedIngredients={props.savedIngredients}
                    setSavedIngredients={props.setSavedIngredients}
                    startingIndex={startingIndexOfValue}
                    endingIndex={endingIndexOfValue}
                />
            </div>
        </div>
    );
}

export default CartItem;