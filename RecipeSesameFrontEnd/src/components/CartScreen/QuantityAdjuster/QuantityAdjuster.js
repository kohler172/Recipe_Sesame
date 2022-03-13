import React, { useState } from "react";
import './QuantityAdjuster.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const QuantityAdjuster = (props) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        // Update quantity
    }

    return (
        <div className="quantityAdjuster">
            <div className="servings">
                <input className="input" type="text" placeholder="Enter text." onChange={handleQuantityChange} value={quantity}></input>
            </div>
            <div className="servingsArrows quantityArrows">
                <FontAwesomeIcon icon={faAngleDown} size="lg"/>
                <FontAwesomeIcon icon={faAngleUp} size="lg"/>
            </div>
        </div>
    )
}

export default QuantityAdjuster;