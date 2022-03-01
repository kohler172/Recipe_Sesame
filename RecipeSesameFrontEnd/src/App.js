import { useState } from 'react';
import './App.css';
import Logo from './components/HomeScreen/Logo/Logo';
import Chatbox from './components/HomeScreen/Chatbox/Chatbox';
import RecommendedContainer from './components/HomeScreen/RecommendedContainer/RecommendedContainer';
import CartButton from './components/HomeScreen/CartButton/CartButton';
import RecipeContainer from './components/RecipeScreen/RecipeContainer/RecipeContainer';
import CartContainer from './components/CartScreen/CartContainer/CartContainer';
import { useEffect } from 'react/cjs/react.development';

function App() {
  const [numberOfMessagesSent, setNumberOfMessagesSent] = useState(0);

  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [savedIngredients, setSavedIngredients] = useState(localStorage.getItem('ingredients') ? localStorage.getItem('ingredients') : []);
  const [savedRecipes, setSavedRecipes] = useState(localStorage.getItem('recipes') ? localStorage.getItem('recipes') : []);

  const [recipeScreenIsOpen, setRecipeScreenIsOpen] = useState(false);
  const [openRecipe, setOpenRecipe] = useState({});
  const [cartScreenIsOpen, setCartScreenIsOpen] = useState(false);

  const randomUrl = 'http://localhost:8000/random/';

  useEffect(() => {
    fetch(randomUrl)
      .then(response => response.json())
      .then(data => setRecommendedRecipes(data));
  }, [])

  return (
    <div className="App">
      <div className="header">
        <Logo />
        <CartButton 
          setCartScreenIsOpen={setCartScreenIsOpen}
        />
      </div>
      <div className="mainContainer">
        <div className="container chatContainer">
          <h2>Chat with Sesame</h2>
          <Chatbox 
            numberOfMessagesSent={numberOfMessagesSent} 
            setNumberOfMessagesSent={setNumberOfMessagesSent}
            setRecommendedRecipes={setRecommendedRecipes}
          />
        </div>
        
        <RecommendedContainer
          setOpenRecipe={setOpenRecipe}
          setRecipeScreenIsOpen={setRecipeScreenIsOpen}
          numberOfMessagesSent={numberOfMessagesSent} 
          recommendedRecipes={recommendedRecipes}
          setRecommendedRecipes={setRecommendedRecipes}
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
