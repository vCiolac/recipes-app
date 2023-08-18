import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Meals from './Pages/Meals/Meals';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={ Login } />
        <Route path="/meals" Component={ Meals } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
