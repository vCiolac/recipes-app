import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Profile from './Pages/Profile/Profile';
import DoneRecipes from './Pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes/FavoriteRecipes';
import Recipes from './Pages/Recipes/Recipes';

function App() {
  return (
    <Routes>
      <Route path="/" Component={ Login } />
      <Route path="/meals" Component={ Recipes } />
      <Route path="/drinks" Component={ Recipes } />
      <Route path="/meals/:id-da-receita" Component={ Recipes } />
      <Route path="/drinks/:id-da-receita" Component={ Recipes } />
      <Route path="/meals/:id-da-receita/in-progress" Component={ Recipes } />
      <Route path="/drinks/:id-da-receita/in-progress" Component={ Recipes } />
      <Route path="/profile" Component={ Profile } />
      <Route path="/done-recipes" Component={ DoneRecipes } />
      <Route path="/favorite-recipes" Component={ FavoriteRecipes } />
    </Routes>
  );
}

export default App;
