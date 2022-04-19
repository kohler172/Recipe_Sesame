import React, {useState} from 'react';
import './RecommendedRecipe.css';

const scraperUrl = 'http://localhost:8000/scraper/';
let val = 'hi'

const RecommendedRecipe = (props) => {
    const[img_url, setImgUrl] = useState('')
    const handleRecipeClick = () => {
        console.log("opening recipe")
        props.setOpenRecipe(props.recipe);
        //console.log(props.recipe.Cleaned_Ingredients.replace(/"/g, ' inch').replace(/'/g, '"'));
        props.setRecipeScreenIsOpen(true);
    }
    
    
    const scrapeImage = async () => {
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
            setImgUrl(data)
            return data
        })
    }
    
    return (
        <div style={{ backgroundImage: "url(" + img_url +")"}} className="recommendedRecipe" onClick={handleRecipeClick}>
            {
                console.log(scrapeImage())
            }
            <h3>{props.recipe.Project_Title}</h3>
        </div>
        // <div style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/"  + props.recipe.Image_Name + ".jpg" + ")"}} className="recommendedRecipe" onClick={handleRecipeClick}>
        //     <h3>{props.recipe.Project_Title}</h3>
        // </div>
    );

}

export default RecommendedRecipe;