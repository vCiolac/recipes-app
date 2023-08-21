import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Meals from './Pages/Meals/Meals';
import Drinks from './Pages/Drinks/Drinks';
import Profile from './Pages/Profile/Profile';
import DoneRecipes from './Pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={ Login } />
        <Route path="/meals" Component={ Meals } />
        <Route path="/drinks" Component={ Drinks } />
        <Route path="/meals/:id-da-receita" Component={ Meals } />
        <Route path="/drinks/:id-da-receita" Component={ Drinks } />
        <Route path="/meals/:id-da-receita/in-progress" Component={ Meals } />
        <Route path="/drinks/:id-da-receita/in-progress" Component={ Drinks } />
        <Route path="/profile" Component={ Profile } />
        <Route path="/done-recipes" Component={ DoneRecipes } />
        <Route path="/favorite-recipes" Component={ FavoriteRecipes } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
