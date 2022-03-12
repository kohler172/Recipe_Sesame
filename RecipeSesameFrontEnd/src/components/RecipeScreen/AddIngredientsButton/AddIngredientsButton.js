import React, { useState } from "react";
import './AddIngredientsButton.css';

const AddIngredientsButton = (props) => {
    const [servings, setServings] = useState(0);

    return(
        <div className="addIngredientsButtonContainer">
            <div className="servingsLabel">
                <p>Servings</p>
            </div>
            <div className="addIngredientsLabel">
                <p>Add Ingredients</p>
            </div>
        </div>
    );
}

export default AddIngredientsButton;