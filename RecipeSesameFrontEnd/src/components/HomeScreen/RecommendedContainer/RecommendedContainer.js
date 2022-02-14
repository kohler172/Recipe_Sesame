import React, { useEffect } from 'react';
import RecommendedRecipe from '../RecommendedRecipe/RecommendedRecipe';
import './RecommendedContainer.css';

const RecommendedContainer = (props) => {
    useEffect(() => {
    }, [props.recommendedRecipes]);

    // Recipes will have {ingredients, instructions, picture_link, and title}

    return (
        <div className="container recommendedContainer">
            <h2>Suggested Recipes</h2>
            <div className="recommendedScroll">
                { props.recommendedRecipes.slice(0, 6).map((recipe, index) => (
                    <RecommendedRecipe 
                        key={index} 
                        recipe={recipe} 
                        setRecipeScreenIsOpen={props.setRecipeScreenIsOpen} 
                        setOpenRecipe={props.setOpenRecipe}
                    />
                )) }
            </div>
        </div>
    );

}

export default RecommendedContainer;