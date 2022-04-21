import React, { useState } from "react";
import './RecipeDescription.css';

const scraperUrl = 'http://localhost:8000/scraper/';

const RecipeDescription = (props) => {
    const[instructions, setInstructions] = useState('')

    const scrapeInstructions = async () => {
        let val = ''
        return await fetch(scraperUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'sender': "default", 'type': 'text', 'message': props.recipe.Instructables_link})
        })
        .then(response => response.json())
        .then(data => {
            setInstructions(data)
            return data
        })
    }

    return (
        <div className="recipeDescription">
            <div className="instructions">
                <img src={props.recipe.img_url} alt="Lamp" width="50%" height="" style={{ alignSelf: 'center' }}></img>
                {props.recipe.instructions}
            </div>
        </div>
    );
}

export default RecipeDescription;