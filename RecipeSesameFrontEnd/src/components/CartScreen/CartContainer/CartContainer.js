import React from "react";
import CartContents from "../CartContents/CartContents";
import CartHeader from "../CartHeader/CartHeader";
import './CartContainer.css';

const CartContainer = (props) => {
    return (
        <div className="cartContainer">
            <div className="screenCard">
                <CartHeader setCartScreenIsOpen={props.setCartScreenIsOpen}/>
                <CartContents savedIngredients={props.savedIngredients} savedRecipes={props.savedRecipes} />
            </div>
        </div>
    );
}

export default CartContainer;