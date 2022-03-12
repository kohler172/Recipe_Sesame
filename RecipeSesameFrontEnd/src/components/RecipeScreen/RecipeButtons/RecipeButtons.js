import React from "react";
import RecipeButton from "../RecipeButton/RecipeButton";

const RecipeButtons = (props) => {
    const addIngredientsLabel = "Add ingredients";
    const saveRecipeLabel = "Save recipe";
    const savedRecipeLabel = "Recipe saved";

    return (
        <div className="recipeButtons">
            <RecipeButton 
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
        </div>
    )
}

export default RecipeButtons;