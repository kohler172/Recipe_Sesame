import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './CartItem.css';

const CartItem = (props) => {
    return props.item.Title ? (
        <div className="cartItem">
            <img src={process.env.PUBLIC_URL + "/images/"  + props.item.Image_Name + ".jpg"} alt={props.item.Title} />
            <p>{props.item.Title}</p>
            <FontAwesomeIcon icon={faTrash} />
        </div>
    ) : (
        <div className="cartItem cartIngredient">
            <p>{props.item}</p>
            <FontAwesomeIcon icon={faTrash} />
        </div>
    );
}

export default CartItem;