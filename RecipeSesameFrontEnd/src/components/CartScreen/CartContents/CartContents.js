import React, { useState } from "react";
import CartItem from "../CartItem/CartItem";
import ListSelector from "../ListSelector/ListSelector";
import './CartContents.css';

const CartContents = (props) => {
    const [displayIngredients, setDisplayIngredients] = useState(true);

    return (
        <div className="cartContents">
            <ListSelector 
                displayIngredients={displayIngredients}
                setDisplayIngredients={setDisplayIngredients}
            />
            
            <div className="cartList">
                {displayIngredients ? props.savedIngredients.map((item, index) => (
                    <CartItem key={index} item={item} />
                )) : props.savedRecipes.map((item, index) => (
                    <CartItem key={index} item={item} setOpenRecipe={props.setOpenRecipe} setRecipeScreenIsOpen={props.setRecipeScreenIsOpen}/>
                )) }
            </div>

            <div className="printButton">
                <p>Print List</p>
            </div>
        </div>
    );
}

export default CartContents;