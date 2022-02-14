import React, { useState } from "react";
import RecipeButton from "../RecipeButton/RecipeButton";
import RecipeCartContainer from "../RecipeCartContainer/RecipeCartContainer";
import './RecipeControls.css';

const RecipeControls = (props) => {
    const [recipeSaved, setRecipeSaved] = useState(false);
    const addIngredientsLabel = "Add ingredients";
    const saveRecipeLabel = "Save recipe";
    const savedRecipeLabel = "Recipe saved";

    return (
        <div className="recipeControls">
            <img src={process.env.PUBLIC_URL + "/images/"  + props.recipe.Image_Name + ".jpg"} alt={props.recipe.Title} />
            <RecipeCartContainer savedIngredients={props.savedIngredients}/>
            <div className="recipeButtons">
                <RecipeButton 
                    recipe={props.recipe} 
                    savedRecipes={props.savedRecipes}
                    savedIngredients={props.savedIngredients}
                    setSavedIngredients={props.setSavedIngredients} 
                    setSavedRecipes={props.setSavedRecipes}
                    setRecipeSaved={setRecipeSaved} 
                    recipeSaved={recipeSaved}
                    type={'add'} 
                    label={addIngredientsLabel} 
                />
                {recipeSaved ? (<RecipeButton 
                                    recipe={props.recipe} 
                                    label={savedRecipeLabel} 
                                    setRecipeSaved={setRecipeSaved}
                                    recipeSaved={recipeSaved}
                                    type={'save'} 
                                />) : (<RecipeButton 
                                            recipe={props.recipe} 
                                            label={saveRecipeLabel} 
                                            setRecipeSaved={setRecipeSaved} 
                                            savedRecipes={props.savedRecipes}
                                            setSavedRecipes={props.setSavedRecipes}
                                            recipeSaved={recipeSaved}
                                            type={'save'} 
                                        />) }
            </div>
        </div>
    );
}

export default RecipeControls;