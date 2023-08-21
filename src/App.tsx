import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Meals from './Pages/Meals/Meals';
import Drinks from './Pages/Drinks/Drinks';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={ Login } />
        <Route path="/meals" Component={ Meals } />
        <Route path="/drinks" Component={ Drinks } />
        <Route path="/profile" Component={ Profile } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
