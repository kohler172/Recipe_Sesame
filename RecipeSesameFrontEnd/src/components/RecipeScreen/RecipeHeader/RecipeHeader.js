import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './RecipeHeader.css';

const RecipeHeader = (props) => {
    return (
        <div className="cardHeader">
            <h1>{props.recipeName}</h1>
            <FontAwesomeIcon icon={faTimes} size="2x" onClick={props.closeRecipeScreen}/>
        </div>
    );
}

export default RecipeHeader;