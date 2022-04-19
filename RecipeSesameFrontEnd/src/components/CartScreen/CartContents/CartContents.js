import React, { useEffect, useState } from "react";
import CartItem from "../CartItem/CartItem";
import ListSelector from "../ListSelector/ListSelector";
import './CartContents.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

const CartContents = (props) => {
    const [ingredients, setIngredients] = useState(props.savedIngredients);
    const [recipes, setRecipes] = useState(props.savedRecipes);
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        filterResults(event.target.value);
    }

    const filterResults = (filter) => {
        if (filter.length > 0) {
            const ogIngredients = props.savedIngredients;
            const ogRecipes = props.savedRecipes;

            if (props.displayIngredients) {
                setIngredients(ogIngredients.filter(ingredient => ingredient.toLowerCase().search(filter.toLowerCase()) > -1));
            } else {
                setRecipes(ogRecipes.filter(recipe => recipe.Title.toLowerCase().search(filter.toLowerCase()) > -1));
            }
        } else {
            setIngredients(props.savedIngredients);
            setRecipes(props.savedRecipes);
        }
    }

    useEffect(() => {
        setIngredients(props.savedIngredients);
        setRecipes(props.savedRecipes);
        filterResults(searchText);
    }, [props.savedIngredients, props.savedRecipes])

    return (
        <div className="cartContents">
            {props.savedRecipes && props.savedRecipes.length > 0 ? (
                    <div className="cartList allRadius">
                        {recipes.map((item, index) => (
                            <CartItem key={index} 
                                item={item} 
                                setOpenRecipe={props.setOpenRecipe} 
                                setRecipeScreenIsOpen={props.setRecipeScreenIsOpen}
                                savedRecipes={props.savedRecipes}
                                setSavedRecipes={props.setSavedRecipes}
                                itemType="recipe"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="cartList empty">
                        <p>You haven't saved any projects.</p>
                    </div>
                )}
        </div>
    );
}

export default CartContents;
