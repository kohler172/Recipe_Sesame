import React from 'react';
import './Message.css';

// Warning: ternary hell below

const Message = (props) => {
    return props.isUserMessage ? (
        props.firstInGroup ? (
            <div className="message rightMessage firstRight">
                <p>{props.content}</p>
            </div> 
        ) : (
            props.lastInGroup ? (
                <div className="message rightMessage lastRight">
                    <p>{props.content}</p>
                </div> 
            ) : (
                <div className="message rightMessage">
                    <p>{props.content}</p>
                </div> 
            )
        )
    ) : (
        props.firstInGroup ? (
            <div className="message leftMessage firstLeft">
                    <p>{props.content}</p>
                </div>
        ) : (
            props.lastInGroup ? (
                <div className="message leftMessage lastLeft">
                    <p>{props.content}</p>
                </div>
            ) : (
                <div className="message leftMessage">
                    <p>{props.content}</p>
                </div>
            )
        )
    );
}

export default Message;