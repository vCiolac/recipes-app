import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Profile from './Pages/Profile/Profile';
import DoneRecipes from './Pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes/FavoriteRecipes';
import Recipes from './Pages/Recipes/Recipes';
import RecipesDetails from './Pages/RecipeDetails/RecipeDetails';
import RecipesProvider from './context/recipesProvider';
import RecipeInProgress from './Pages/RecipeInProgress/RecipeInProgress';

function App() {
  return (
    <RecipesProvider>
      <Routes>
        <Route path="/" Component={ Login } />
        <Route path="/meals" Component={ Recipes } />
        <Route path="/drinks" Component={ Recipes } />
        <Route path="/meals/:id" Component={ RecipesDetails } />
        <Route path="/drinks/:id" Component={ RecipesDetails } />
        <Route path="/meals/:id/in-progress" Component={ RecipeInProgress } />
        <Route path="/drinks/:id/in-progress" Component={ RecipeInProgress } />
        <Route path="/profile" Component={ Profile } />
        <Route path="/done-recipes" Component={ DoneRecipes } />
        <Route path="/favorite-recipes" Component={ FavoriteRecipes } />
      </Routes>
    </RecipesProvider>
  );
}

export default App;
