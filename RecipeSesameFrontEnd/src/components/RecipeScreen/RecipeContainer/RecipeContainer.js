import React, { useState } from "react";
import RecipeDescription from "../RecipeDescription/RecipeDescription";
import RecipeHeader from "../RecipeHeader/RecipeHeader";
import RecipeControls from "../RecipeControls/RecipeControls";
import './RecipeContainer.css';

const RecipeContainer = (props) => {
    const [recipeSaved, setRecipeSaved] = useState(props.savedRecipes.includes(props.openRecipe));
    //const [ingredients, setIngredients] = useState(JSON.parse(props.openRecipe.Cleaned_Ingredients.replace(/"/g, ' inch').replace(/'/g, '"')));
    const [ingredients, setIngredients] = useState(props.openRecipe.Subcategory);

    const closeRecipeScreen = () => {
        props.setRecipeScreenIsOpen(false);
    }

    return (
        <div className="recipeContainer">
            <div className="recipeMain">
                <div className="shade" onClick={closeRecipeScreen}></div>
                <div className="screenCard recipeCard">
                    <RecipeHeader recipeName={props.openRecipe.Project_Title} closeRecipeScreen={closeRecipeScreen}/>
                    <div className="recipeContent">
                        <RecipeDescription recipe={props.openRecipe} ingredients={ingredients} />
                        {/* <RecipeControls 
                            setRecipeSaved={setRecipeSaved}
                            recipe={props.openRecipe}
                            ingredients={ingredients}
                            setIngredients={setIngredients}
                            recipeSaved={recipeSaved}
                            savedRecipes={props.savedRecipes}
                            setSavedRecipes={props.setSavedRecipes}
                            savedIngredients={props.savedIngredients}
                            setSavedIngredients={props.setSavedIngredients}
                        /> */}
                    </div>
                     
                </div>
            </div>
        </div>
    );
    
}

export default RecipeContainer;