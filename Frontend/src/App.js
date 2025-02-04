import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { store } from './store';
import MenuScreen from './screens/MenuScreen';
import CategoryScreen from './screens/CategoryScreen';
import DrinkScreen from './screens/DrinkScreen';
import PratoPrincipalScreen from './screens/PratoPrincipalScreen';
import SobremesaScreen from './screens/SobremesaScreen';
import CartIcon from './Components/CartIcon';
import Login from './screens/Login';
import Register from './screens/Register';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <CartIcon />
        <Container className="my-4" style={{ marginTop: '80px' }}>
          <Routes>
            <Route path="/" element={<MenuScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:categoryName" element={<CategoryScreen />} />
            <Route path="/bebidas/:subCategory?" element={<DrinkScreen />} />
            <Route path="/prato-principal" element={<PratoPrincipalScreen />} />
            <Route path="/sobremesa" element={<SobremesaScreen />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;