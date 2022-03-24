import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './CartItem.css';
import QuantityAdjuster from "../QuantityAdjuster/QuantityAdjuster";

const CartItem = (props) => {
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
        // TODO - Get the intial quantity in the given ingredient
        /*
        - Possible values:
            - No numbers at all (disable quantity adjuster)
            - Integer (ex: 4)
            - Multi-character fraction (ex: 1/2)
                - There is a “/“ between two integers
            - Multi-character fraction > 1 (ex: 1 1/2)
                - There is a “ “ and a “/“ between two integers
            - Unicode fraction (ex: ½)
                - Existence of fractional unicode
            - Unicode fraction > 1 (ex: 1 ½)
                - Fractional unicode after a “ “ after an integer
        */
        if (ingredient.charAt(0) >= '0' || ingredient.charAt(0) <= '9') return ingredient.charAt(0);
        else return 1;
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
                />
            </div>
        </div>
    );
}

export default CartItem;