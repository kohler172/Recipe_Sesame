import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import './CartButton.css';

const CartButton = (props) => {
    const handleButtonClick = () => {
        props.setCartScreenIsOpen(true);
    }

    return (
        <div className="cartBtn" onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faShoppingBasket} size="1x"/>
        </div>
    );
}

export default CartButton;