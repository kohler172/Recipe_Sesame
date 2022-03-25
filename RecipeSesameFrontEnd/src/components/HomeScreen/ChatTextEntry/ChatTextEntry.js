import React, { useState } from 'react';
import './ChatTextEntry.css';

const ChatTextEntry = (props) => {
    const [textContent, setTextContent] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [negKeywords, setNegKeywords] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const [prevRecipes, setPrevRecipes] = useState([]);
    
    const randomUrl = 'http://localhost:8000/random/';
    const messageUrl = 'http://localhost:8000/message/';
    const rasa_url = 'http://localhost:5005/webhooks/rest/webhook'

    const handleTextChange = (event) => {
        setTextContent(event.target.value);
    }

    const handleResetMessage = () => {
        setIsWaiting(false);
        setKeywords([]);
        setNegKeywords([]);
        fetch(randomUrl)
            .then(response => response.json())
            .then(data => props.setRecommendedRecipes(data));
            const random = Math.random();

            if (random < 0.33) {
                props.addMessage({ content: "Your search is cleared. What would you like to look for?", isUserMessage: false });
            } else if (random < 0.66) {
                props.addMessage({ content: "Starting from scratch. What kinds of recipes would you like?", isUserMessage: false });
            } else {
                props.addMessage({ content: "Ok, starting over. Tell me what you're looking for.", isUserMessage: false });
            }

            props.removeTypingMessages();
    }

    const isResetMessage = (message) => {
        return (message.toLowerCase().search('search') > -1 || 
                message.toLowerCase().search('restart') > -1 ||
                message.toLowerCase().search('reset') > -1);
    }

    const recipesAreEqual = (recA, recB) => {
        if (recA.Title !== recB.Title) return false;
        if (recA.Cleaned_Ingredients !== recB.Cleaned_Ingredients) return false;
        if (recA.Instructions !== recB.Instructions) return false;
        return true;
    }

    const resultsAreUnchanged = (newRecipes) => {
        console.log(newRecipes);
        if (newRecipes.length !== prevRecipes.length) return false;
        
        for (let i = 0; i < newRecipes.length; i++) {
            if (!recipesAreEqual(newRecipes[i], prevRecipes[i])) return false;
        }

        return true;
    }

    const handleShowMore = () => {
        const originalIndex = props.resultStartingIndex;
        const newIndex = props.resultStartingIndex + 6 >= props.recommendedRecipes.length ? 0 : props.resultStartingIndex + 6;
        setIsWaiting(false);
        props.setResultStartingIndex(props.resultStartingIndex + 6 >= props.recommendedRecipes.length ? 0 : props.resultStartingIndex + 6);
        
        if (originalIndex === newIndex) {
            props.addMessage({ content: "There aren't anymore recipes.", isUserMessage: false })
        } else {
            const random = Math.random();
            if (random < 0.33) {
                props.addMessage({ content: "Here's some other recipes.", isUserMessage: false });
            } else if (random < 0.66) {
                props.addMessage({ content: "Ok, here's more recipes from your search.", isUserMessage: false });
            } else {
                props.addMessage({ content: "You might like these recipes.", isUserMessage: false });
            }
        }
        props.removeTypingMessages();
    }

    const handleSearchMessage = () => {
        let numberOfResults = 0;
        props.setResultStartingIndex(0);

        fetch(messageUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'sender': "test", 'message': textContent, 'keywords': keywords, 'negKeywords': negKeywords})
        })
            .then(response => response.json())
            .then(data => {
                const parsedData = JSON.parse(data);
                if (parsedData.recipes.length < 1) {
                    setIsWaiting(false);
                    props.removeTypingMessages();
                }
                props.setRecommendedRecipes(parsedData.recipes);
                setKeywords(parsedData.keywords);
                setNegKeywords(parsedData.negKeywords);

                /* 
                 *  If results haven't changed, set number of results to negative
                 *  so we display the correct response in the following .then
                 */
                if (resultsAreUnchanged(parsedData.recipes)) numberOfResults = -1;
                else numberOfResults = parsedData.recipes.length;

                setPrevRecipes(parsedData.recipes);
            })
            .then(() => {
                if (numberOfResults < 1) {
                    // Handle no new results on front end to avoid back end complication
                    props.addMessage({ content: "Sorry, we couldn't find any recipes that are a good fit.", isUserMessage: false })
                    props.removeTypingMessages();
                } else {
                    fetch(rasa_url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({'sender': "default", 'message': textContent.toLowerCase()})
                    })
                        .then(response => response.json())
                        .then(data => {    
                            setIsWaiting(false); 
                            data.forEach((x, i) => props.addMessage({ content: data[i].text, isUserMessage: false }));
                            props.removeTypingMessages();
                            props.incrementNumberOfMessagesSent();
                        });
                }
            });
    }

    const handleMessageSend = (event) => {
        event.preventDefault();

        if (textContent.length > 0) {
            props.addMessage({ content: textContent, isUserMessage: true });

            if (!isWaiting) props.addMessage({ content: '...', isUserMessage: false});
            setIsWaiting(true);
            
            if (isResetMessage(textContent)) handleResetMessage();
            else if (textContent.toLowerCase().search('show me more') > -1) handleShowMore();
            else handleSearchMessage();

            setTextContent('');
        }
    }

    return (
        <div>
            <form className="chatTextEntry" onSubmit={handleMessageSend}>
                <input className="input" type="text" placeholder="Enter text." onChange={handleTextChange} value={textContent}></input>
                <input className="send" type="submit" value="Send"></input>
            </form>
        </div>
    );
}

export default ChatTextEntry;