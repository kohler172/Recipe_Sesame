import React from 'react';
import './RecommendedRecipe.css';

const RecommendedRecipe = (props) => {
    const handleRecipeClick = () => {
        props.setOpenRecipe(props.recipe);
        console.log(props.recipe.Cleaned_Ingredients.replace(/"/g, ' inch').replace(/'/g, '"'));
        props.setRecipeScreenIsOpen(true);
    }

    return (
        <div style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/"  + props.recipe.Image_Name + ".jpg" + ")"}} className="recommendedRecipe" onClick={handleRecipeClick}>
            <h3>{props.recipe.Title}</h3>
        </div>
    );

}

export default RecommendedRecipe;