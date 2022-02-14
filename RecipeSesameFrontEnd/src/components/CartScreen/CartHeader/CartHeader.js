import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CartHeader = (props) => {
    const closeCartScreen = () => {
        props.setCartScreenIsOpen(false);
    }

    return (
        <div className="cardHeader">
            <h1>Your Basket</h1>
            <FontAwesomeIcon icon={faTimes} size="2x" onClick={closeCartScreen}/>
        </div>
    );
}

export default CartHeader;