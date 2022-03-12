import React, { useState } from "react";
import CartContents from "../CartContents/CartContents";
import CartHeader from "../CartHeader/CartHeader";
import RecipeContainer from "../../RecipeScreen/RecipeContainer/RecipeContainer";
import './CartContainer.css';

const CartContainer = (props) => {
    const [recipeScreenIsOpen, setRecipeScreenIsOpen] = useState(false);
    const [openRecipe, setOpenRecipe] = useState({});
    const [displayIngredients, setDisplayIngredients] = useState(true);

    const closeCartScreen = () => {
        props.setCartScreenIsOpen(false);
    }

    return (recipeScreenIsOpen ? 
            <RecipeContainer 
              openRecipe={openRecipe} 
              setRecipeScreenIsOpen={setRecipeScreenIsOpen}
              savedIngredients={props.savedIngredients}
              savedRecipes={props.savedRecipes}
              setSavedIngredients={props.setSavedIngredients}
              setSavedRecipes={props.setSavedRecipes}
            /> 
          : 
          <div className="cartContainer">
            <div className="shade" onClick={closeCartScreen}></div>
            <div className="screenCard cartCard">
                <CartHeader setCartScreenIsOpen={props.setCartScreenIsOpen}/>
                <CartContents 
                    setOpenRecipe={setOpenRecipe}
                    setRecipeScreenIsOpen={setRecipeScreenIsOpen}
                    savedIngredients={props.savedIngredients} 
                    savedRecipes={props.savedRecipes} 
                    displayIngredients={displayIngredients}
                    setDisplayIngredients={setDisplayIngredients}
                />
            </div>
        </div>
    );
}

export default CartContainer;