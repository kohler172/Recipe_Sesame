import React from "react";
import RecipeButton from "../RecipeButton/RecipeButton";
import AddIngredientsButton from "../AddIngredientsButton/AddIngredientsButton";

const RecipeButtons = (props) => {
    const addIngredientsLabel = "Add Ingredients";
    const saveRecipeLabel = "Save Recipe";
    const savedRecipeLabel = "Recipe Saved";

    return (
        <div className="recipeButtons">
            {props.recipeSaved ? (<RecipeButton 
                                recipe={props.recipe} 
                                label={savedRecipeLabel} 
                                savedRecipes={props.savedRecipes}
                                setSavedRecipes={props.setSavedRecipes}
                                setRecipeSaved={props.setRecipeSaved}
                                recipeSaved={props.recipeSaved}
                                type={'save'} 
                            />) : (<RecipeButton 
                                        recipe={props.recipe} 
                                        label={saveRecipeLabel} 
                                        setRecipeSaved={props.setRecipeSaved} 
                                        savedRecipes={props.savedRecipes}
                                        setSavedRecipes={props.setSavedRecipes}
                                        recipeSaved={props.recipeSaved}
                                        type={'save'} 
                                    />) }
            <AddIngredientsButton 
                recipe={props.recipe} 
                savedRecipes={props.savedRecipes}
                savedIngredients={props.savedIngredients}
                setSavedIngredients={props.setSavedIngredients} 
                setSavedRecipes={props.setSavedRecipes}
                setRecipeSaved={props.setRecipeSaved} 
                recipeSaved={props.recipeSaved}
                type={'add'} 
                label={addIngredientsLabel} 
            />
        </div>
    )
}

export default RecipeButtons;