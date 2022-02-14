import React, { useState } from 'react';
import ChatTextEntry from '../ChatTextEntry/ChatTextEntry';
import MessageContainer from '../MessageContainer/MessageContainer';
import './Chatbox.css'

const Chatbox = (props) => {
    const [messages, setMessages] = useState([{ content: "Hello! What kind of recipes are you looking for?", isUserMessage: false }]);

    const addMessage = (message) => {
        const currentMessages = messages;
        currentMessages.push(message);
        setMessages(currentMessages);
    }

    const incrementNumberOfMessagesSent = () => {
        props.setNumberOfMessagesSent(props.numberOfMessagesSent + 1);
        
        // The above function call is async, so these if statements execute first
        if (props.numberOfMessagesSent === 0) {
            addMessage({ content: "Sounds good! Any other ingredients you'd like to include?", isUserMessage: false });
        } else {
            addMessage({ content: "I think you might enjoy these recipes. Would you like to find any other recipes?", isUserMessage: false });
        }
    }

    return (
        <div className="chatbox">
            <MessageContainer messages={messages}/>
            <ChatTextEntry 
                incrementNumberOfMessagesSent={incrementNumberOfMessagesSent} 
                addMessage={addMessage}
                setRecommendedRecipes={props.setRecommendedRecipes}
            />
        </div>
    );
}

export default Chatbox;