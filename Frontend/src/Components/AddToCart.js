import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItem } from '../store';

const AddToCart = ({ item }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);

  // Inicializa os tamanhos
  useEffect(() => {
    if (item.sizes && item.sizes.length > 0) {
      setSelectedSize(item.sizes[0]);
      setFinalPrice(item.sizes[0].price);
    } else {
      // Cria um tamanho padrão para itens sem sizes
      setSelectedSize({ size: 'Único', price: item.price });
      setFinalPrice(item.price);
    }
  }, [item]);

  const handleAdd = () => {
    if (!selectedSize) return;
    
    dispatch(addItem({ 
      id: item.id,
      name: item.name,
      price: finalPrice,
      quantity: quantity,
      size: selectedSize.size
    }));
    
    setShowModal(false);
    setQuantity(1);
  };

  const handleSizeChange = (size) => {
    const selected = item.sizes.find(s => s.size === size);
    setSelectedSize(selected);
    setFinalPrice(selected.price);
  };

  return (
    <>
      <Button 
        variant="primary" 
        className="w-100" 
        size="lg"
        onClick={() => setShowModal(true)}
      >
        Adicionar ao Pedido
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {item.sizes && item.sizes.length > 1 && (
            <div className="mb-3">
              <label>Tamanho:</label>
              <select 
                className="form-select"
                value={selectedSize?.size}
                onChange={(e) => handleSizeChange(e.target.value)}
              >
                {item.sizes.map(size => (
                  <option key={size.size} value={size.size}>
                    {size.size} - R$ {size.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="text-center">
            <ButtonGroup aria-label="Quantidade">
              <Button variant="secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </Button>
              <Button variant="light" disabled style={{ width: '60px' }}>
                {quantity}
              </Button>
              <Button variant="secondary" onClick={() => setQuantity(quantity + 1)}>
                +
              </Button>
            </ButtonGroup>
          </div>

          <div className="mt-3 text-center h4">
            Total: R$ {(finalPrice * quantity).toFixed(2)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAdd}>
            {item.sizes?.length > 1 
              ? `Adicionar (${quantity}x ${selectedSize?.size})`
              : `Adicionar ${quantity}x`}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddToCart;