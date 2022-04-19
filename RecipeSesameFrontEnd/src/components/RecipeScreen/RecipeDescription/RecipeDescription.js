import React, { useState } from "react";
import './RecipeDescription.css';

const scraperUrl = 'http://localhost:8000/scraper/';

const RecipeDescription = (props) => {
    const[instructions, setInstructions] = useState('')
    const scrape_instructions = async () => {
        let val = ''
        return await fetch(scraperUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'sender': "default", 'message': props.recipe.Instructables_link})
        })
        .then(response => response.json())
        .then(data => {
            setInstructions(data)
            return data
        })
    }

    return (
        <div className="recipeDescription">
            {/* { props.ingredients.map(line => <p>{line}</p>) } */}
            <div className="instructions">
                {instructions}  
            </div>
        </div>
    );
}

export default RecipeDescription;