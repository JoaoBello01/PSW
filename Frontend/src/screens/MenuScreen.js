import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../custom.css';

const MenuScreen = () => {
  const navigate = useNavigate();
  const categories = useSelector(state => state.menu?.categories || []);

  const categoryIcons = {
    'Entradas': '🍴',
    'Prato Principal': '🍲',
    'Sobremesa': '🍰',
    'Bebidas': '🍹'
  };

  const handleNavigation = (category) => {
    if (!category) return;

    const encodedCategory = encodeURIComponent(category);
    category === 'Bebidas' 
      ? navigate('/bebidas') 
      : navigate(`/category/${encodedCategory}`);
  };

  return (
    <div className="text-center">

      
      <div className="category-header">
        <h1 className="display-4">Bem-vindo ao Nosso Restaurante</h1>
        <p className="lead">Escolha uma categoria para começar</p>
      </div>

      <Row className="g-4">
        {categories.map(category => (
          <Col md={6} key={category} className="mb-4">
            <Card className="menu-card h-100">
              <Card.Body className="d-flex flex-column justify-content-center">
                <h2 className="mb-4 display-6">{categoryIcons[category]}</h2>
                <Button 
                  variant="outline-dark" 
                  className="nav-button py-3"
                  onClick={() => handleNavigation(category)}
                >
                  {category}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MenuScreen;