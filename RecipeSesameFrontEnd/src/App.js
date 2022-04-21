import { useState } from 'react';
import './App.css';
import Logo from './components/HomeScreen/Logo/Logo';
import Chatbox from './components/HomeScreen/Chatbox/Chatbox';
import RecommendedContainer from './components/HomeScreen/RecommendedContainer/RecommendedContainer';
import CartButton from './components/HomeScreen/CartButton/CartButton';
import RecipeContainer from './components/RecipeScreen/RecipeContainer/RecipeContainer';
import CartContainer from './components/CartScreen/CartContainer/CartContainer';
import { useEffect } from 'react/cjs/react.development';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [numberOfMessagesSent, setNumberOfMessagesSent] = useState(0);

  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [savedIngredients, setSavedIngredients] = useState(localStorage.getItem('savedIngredients') ? JSON.parse(localStorage.getItem('savedIngredients')) : []);
  const [savedRecipes, setSavedRecipes] = useState(localStorage.getItem('savedRecipes') ? JSON.parse(localStorage.getItem('savedRecipes')) : []);

  const [recipeScreenIsOpen, setRecipeScreenIsOpen] = useState(false);
  const [openRecipe, setOpenRecipe] = useState({});
  const [cartScreenIsOpen, setCartScreenIsOpen] = useState(false);
  const [resultStartingIndex, setResultStartingIndex] = useState(0);

  const randomUrl = 'http://localhost:8000/random/';
  const keywordsUrl = 'http://localhost:8000/keywords/';

  useEffect(() => {
    window.addEventListener('beforeunload', (event) => {
      fetch(keywordsUrl, {method: 'DELETE'})
    });
    fetch(randomUrl)
      .then(response => response.json())
      .then(data => 
       //console.log(data));
        setRecommendedRecipes(data));
  }, [])

  return (
    <div className="App">
      <div className="header">
        <Logo />
        <div className="headerButtons">
          <div className="recipeButton accountBtn">
            <FontAwesomeIcon icon={faUser} size="1x"/>
          </div>
          <CartButton 
            setCartScreenIsOpen={setCartScreenIsOpen}
          />
        </div>
      </div>
      <div className="mainContainer">
        <div className="container chatContainer">
          <h2>Chat with Sesame</h2>
          <Chatbox 
            numberOfMessagesSent={numberOfMessagesSent} 
            setNumberOfMessagesSent={setNumberOfMessagesSent}
            recommendedRecipes={recommendedRecipes}
            setRecommendedRecipes={setRecommendedRecipes}
            resultStartingIndex={resultStartingIndex}
            setResultStartingIndex={setResultStartingIndex}
          />
        </div>
        
        <RecommendedContainer
          setOpenRecipe={setOpenRecipe}
          setRecipeScreenIsOpen={setRecipeScreenIsOpen}
          numberOfMessagesSent={numberOfMessagesSent} 
          recommendedRecipes={recommendedRecipes}
          setRecommendedRecipes={setRecommendedRecipes}
          resultStartingIndex={resultStartingIndex}
        />
      </div>

      { recipeScreenIsOpen ? 
        <RecipeContainer 
          openRecipe={openRecipe} 
          setRecipeScreenIsOpen={setRecipeScreenIsOpen}
          savedIngredients={savedIngredients}
          savedRecipes={savedRecipes}
          setSavedIngredients={setSavedIngredients}
          setSavedRecipes={setSavedRecipes}
        /> 
      : null }

      { cartScreenIsOpen ?
        <CartContainer 
          setCartScreenIsOpen={setCartScreenIsOpen}
          savedIngredients={savedIngredients}
          savedRecipes={savedRecipes}
          setSavedIngredients={setSavedIngredients}
          setSavedRecipes={setSavedRecipes}
        />
      : null }
    </div>
  );
}

export default App;
