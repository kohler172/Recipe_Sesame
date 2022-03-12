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

    const removeLastMessage = () => {
        const currentMessages = messages;
        currentMessages.pop();
        setMessages(currentMessages);
    }

    const incrementNumberOfMessagesSent = () => {
        props.setNumberOfMessagesSent(props.numberOfMessagesSent + 1);
    }

    return (
        <div className="chatbox">
            <MessageContainer messages={messages}/>
            <ChatTextEntry 
                incrementNumberOfMessagesSent={incrementNumberOfMessagesSent} 
                addMessage={addMessage}
                removeLastMessage={removeLastMessage}
                recommendedRecipes={props.recommendedRecipes}
                setRecommendedRecipes={props.setRecommendedRecipes}
                resultStartingIndex={props.resultStartingIndex}
                setResultStartingIndex={props.setResultStartingIndex}
            />
        </div>
    );
}


export default Chatbox;