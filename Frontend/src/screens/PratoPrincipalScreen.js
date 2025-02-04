import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../custom.css';
import AddToCart from '../Components/AddToCart';

const PratoPrincipalScreen = () => {
  const items = useSelector(state => state.menu.items.principais);

  return (
    <div>
      <div className="category-header mb-5">
        <h1 className="display-5">Pratos Principais</h1>
        <Link to="/" className="btn btn-light mt-3">
          ← Voltar ao Menu
        </Link>
      </div>

      <Row className="g-4">
        {items.map(item => (
          <Col md={6} lg={4} key={item.id}>
            <Card className="item-card">
              <Card.Img 
                variant="top" 
                src={`https://source.unsplash.com/random/800x600/?main-course,${item.name}`}
                className="item-image"
              />
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {item.name}
                  <Badge bg="danger" className="price-tag">
                    R$ {item.price.toFixed(2)}
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

export default PratoPrincipalScreen;