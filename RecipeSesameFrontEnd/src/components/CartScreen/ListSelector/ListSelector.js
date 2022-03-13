import React from "react";
import './ListSelector.css';

const ListSelector = (props) => {
    const handleIngredientClick = () => {
        props.setDisplayIngredients(true);
    }

    const handleRecipeClick = () => {
        props.setDisplayIngredients(false);
    }

    return (
        <div className="listSelector">
            {props.displayIngredients ? (<p className="ingredients selected" onClick={handleIngredientClick}>Ingredients</p>) : (<p className="ingredients unselected rounded" onClick={handleIngredientClick}>Ingredients</p>) }
            {props.displayIngredients ? (<p className="recipes unselected" onClick={handleRecipeClick}>Recipes</p>) : (<p className="recipes selected" onClick={handleRecipeClick}>Recipes</p>) }
        </div>
    );
}

export default ListSelector;