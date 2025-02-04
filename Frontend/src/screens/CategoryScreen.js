import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import '../custom.css';
import AddToCart from '../Components/AddToCart';

const CategoryScreen = () => {
  const { categoryName } = useParams();
  const items = useSelector(state => {
    const categoryKey = categoryName.toLowerCase().replace(/ /g, '');
    return state.menu.items[categoryKey] || [];
  });

  return (
    <div className="text-center">
      
      <div className="category-header mb-4">
        <h1 className="display-4">{categoryName}</h1>
      </div>

      <Row className="g-4">
        {items.map(item => (
          <Col md={6} key={item.id}>
            <Card className="menu-card h-100">
              <Card.Body className="d-flex flex-column justify-content-center">
                <h2 className="mb-4 display-2">{/* Ícone mantido */}</h2>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {item.name}
                  <Badge bg="danger" className="price-tag">
                    {item.sizes ? 
                      `A partir de R$ ${Math.min(...item.sizes.map(s => s.price)).toFixed(2)}` : 
                      `R$ ${item.price?.toFixed(2)}`}
                  </Badge>
                </Card.Title>
                <AddToCart item={item} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoryScreen;