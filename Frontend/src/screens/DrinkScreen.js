import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Card, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../custom.css';
import AddToCart from '../Components/AddToCart';

const DrinkSubmenu = () => {
  const navigate = useNavigate();
  const subCategories = useSelector(state => state.menu.drinkSubCategories);
  return (
    <Tabs
      defaultActiveKey={subCategories[0]}
      className="mb-4"
      onSelect={(key) => navigate(`/bebidas/${key}`)}
    >
      {subCategories.map(sub => (
        <Tab 
          key={sub} 
          eventKey={sub} 
          title={
            <span className="h5">
              {sub === 'Alcoólicas' ? '🍷' : '🧃'} {sub}
            </span>
          }
        />
      ))}
    </Tabs>
  );
};

const DrinkScreen = () => {
  const navigate = useNavigate();
  const { subCategory } = useParams();
  
  const drinkSubCategories = useSelector(state => state.menu.drinkSubCategories);
  const bebidas = useSelector(state => state.menu.items.bebidas);

  useEffect(() => {
    if (!subCategory && drinkSubCategories.length > 0) {
      navigate(`/bebidas/${drinkSubCategories[0]}`, { replace: true });
    }
  }, [subCategory, drinkSubCategories, navigate]);

  const filteredItems = bebidas.filter(item => 
    subCategory ? item.subCategory === subCategory : item
  );

  return (
    <div>
      <div className="category-header mb-5">
        <h1 className="display-5">
          {subCategory || 'Bebidas'}
        </h1>
        <Link to="/" className="btn btn-light mt-3">
          ← Voltar ao Menu
        </Link>
      </div>

      <DrinkSubmenu />

      <Row className="g-4">
        {filteredItems?.map(item => (
          <Col md={6} lg={4} key={item.id}>
            <Card className="item-card">
              <Card.Img 
                variant="top" 
                src={`https://source.unsplash.com/random/800x600/?${item.name}`}
                className="item-image"
              />
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {item.name}
                  <Badge bg="danger" className="price-tag">
                    {item.sizes?.length > 0 
                      ? `A partir de R$ ${Math.min(...item.sizes.map(s => s.price)).toFixed(2)}`
                      : 'Consulte valores'}
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

export default DrinkScreen;