import React, { useState } from "react";
import './QuantityAdjuster.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const QuantityAdjuster = (props) => {
    const [quantity, setQuantity] = useState(1);

    const floatRegExp = new RegExp('^([0-9]+([.][0-9]*)?|[.][0-9]+)$');

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    }

    const onQuantityBlur = (event) => {
        if(!event.target.value.match(floatRegExp)) setQuantity(0);

        // TODO - update value saved in state and localStorage
    }

    const incrementQuantity = () => {
        const currentQuantity = Number(quantity);
        if (currentQuantity >= 5.0) {
            setQuantity(currentQuantity + 1.0);
        } else if (currentQuantity >= 1.0) {
            setQuantity(currentQuantity + 0.5);
        } else {
            setQuantity(currentQuantity + 0.25);
        }
    }

    const decrementQuantity = () => {
        const currentQuantity = Number(quantity);
        let newQuantity = 0.0;
        if (currentQuantity > 5.0) {
            newQuantity = currentQuantity - 1.0;
        } else if (currentQuantity > 1.0) {
            newQuantity = currentQuantity - 0.5;
        } else {
            newQuantity = currentQuantity - 0.25;
        }
        if (newQuantity < 0.0) setQuantity(0.0); // Catch any negatives
        else setQuantity(newQuantity);
    }

    return (
        <div className="quantityAdjuster">
            <div className="servingsArrows quantityArrows">
                <FontAwesomeIcon icon={faAngleDown} onClick={decrementQuantity} size="lg"/>
                <div className="servings quantity">
                    <input className="input" type="text" onChange={handleQuantityChange} onBlur={onQuantityBlur} value={quantity}></input>
                </div>
                <FontAwesomeIcon icon={faAngleUp} onClick={incrementQuantity} size="lg"/>
            </div>
        </div>
    )
}

export default QuantityAdjuster;