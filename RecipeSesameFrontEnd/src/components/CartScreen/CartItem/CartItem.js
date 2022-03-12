import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './CartItem.css';

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
            <FontAwesomeIcon icon={faTrash} className="delete" onClick={removeIngredient}/>
        </div>
    );
}

export default CartItem;