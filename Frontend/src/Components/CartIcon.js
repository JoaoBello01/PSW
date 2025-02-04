import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { removeItem } from '../store';

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  
  return (
    <Dropdown align="end" className="position-fixed top-0 end-0 m-3">
      <Dropdown.Toggle variant="success" id="dropdown-cart">
        🛒 Carrinho 
        <Badge bg="danger" className="ms-2">
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        </Badge>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ minWidth: '300px' }}>
        {cartItems.length === 0 ? (
          <Dropdown.ItemText>Seu carrinho está vazio</Dropdown.ItemText>
        ) : (
          <>
            {cartItems.map(item => (
              <Dropdown.Item 
                key={`${item.id}-${item.size}`} 
                as="div" 
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <span className="fw-bold">{item.name}</span>
                  <br/>
                  <small>{item.quantity}x {item.size} - R$ {item.price.toFixed(2)} cada</small>
                </div>
                <div>
                  <span className="text-success fw-bold me-2">
                    R$ {(item.quantity * item.price).toFixed(2)}
                  </span>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeItem({ id: item.id, size: item.size }));
                    }}
                  >
                    ×
                  </button>
                </div>
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.ItemText className="d-flex justify-content-between">
              <strong>Total:</strong>
              <span className="text-success">
                R$ {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
              </span>
            </Dropdown.ItemText>
            <Dropdown.Item as={Link} to="/checkout" className="text-center bg-light">
              Finalizar Pedido
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CartIcon;