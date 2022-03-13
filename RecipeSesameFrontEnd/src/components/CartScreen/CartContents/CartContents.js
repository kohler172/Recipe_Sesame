import React, { useState } from "react";
import CartItem from "../CartItem/CartItem";
import ListSelector from "../ListSelector/ListSelector";
import './CartContents.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

const CartContents = (props) => {
    return (
        <div className="cartContents">
            <ListSelector 
                displayIngredients={props.displayIngredients}
                setDisplayIngredients={props.setDisplayIngredients}
            />
            
            {props.displayIngredients ? (
                props.savedIngredients && props.savedIngredients.length > 0 ? (
                    <div className="cartList">
                        {props.savedIngredients.map((item, index) => (
                            <CartItem 
                                key={index} 
                                item={item} 
                                savedIngredients={props.savedIngredients}
                                setSavedIngredients={props.setSavedIngredients}
                                itemType="ingredient"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="cartList empty">
                        <p>You don't have any ingredients in your basket.</p>
                    </div>
                )
            ) : (
                props.savedRecipes && props.savedRecipes.length > 0 ? (
                    <div className="cartList allRadius">
                        {props.savedRecipes.map((item, index) => (
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
                        <p>You haven't saved any recipes.</p>
                    </div>
                )
            )}

            <div className="printButton">
            <FontAwesomeIcon icon={faPrint} size="1x"/>
            </div>
        </div>
    );
}

export default CartContents;