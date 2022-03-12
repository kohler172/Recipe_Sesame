import React, { useState } from "react";
import CartItem from "../CartItem/CartItem";
import ListSelector from "../ListSelector/ListSelector";
import './CartContents.css';

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
                            <CartItem key={index} item={item} itemType="ingredient"/>
                        ))}
                    </div>
                ) : (
                    <div className="cartList empty">
                        <p>You don't have any ingredients in your basket.</p>
                    </div>
                )
            ) : (
                props.savedRecipes && props.savedRecipes.length > 0 ? (
                    <div className="cartList taller">
                        {props.savedRecipes.map((item, index) => (
                            <CartItem key={index} 
                                item={item} 
                                setOpenRecipe={props.setOpenRecipe} 
                                setRecipeScreenIsOpen={props.setRecipeScreenIsOpen}
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

            {props.displayIngredients ? (
                <div className="printButton">
                <p>Print List</p>
            </div>
            ) : null}
        </div>
    );
}

export default CartContents;