
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const categorias = [
  'ropa de hombre',
  'ropa de mujer',
  'joyería',
  'electrónica'
];

function AddProductModal({ show, onClose, onAdd }) {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [rate, setRate] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!image || !image.startsWith('http')) newErrors.image = 'Ingrese una URL válida que comience con http';
    if (!title || title.length < 3) newErrors.title = 'El título debe tener al menos 3 caracteres';
    if (!description) newErrors.description = 'La descripción es requerida';
    if (!price || price < 10) newErrors.price = 'El precio debe ser mayor a 10';
    if (!category) newErrors.category = 'La categoría es requerida';
    if (!rate || rate < 1 || rate > 5) newErrors.rate = 'El rating debe estar entre 1 y 5';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onAdd({
      image,
      title,
      description,
      price: parseInt(price),
      category,
      rating: { rate: parseFloat(rate), count: 0 }
    });
    setImage(''); setTitle(''); setDescription(''); setPrice(''); setCategory(''); setRate(''); setErrors({});
    onClose();
  };

  if (!show) return null;
  return (
    <Modal show centered onHide={onClose} backdrop="static" animation>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar nuevo producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Link de la imagen</Form.Label>
            <Form.Control type="url" value={image} onChange={e => setImage(e.target.value)} isInvalid={!!errors.image} />
            <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} minLength={3} isInvalid={!!errors.title} />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={4} value={description} onChange={e => setDescription(e.target.value)} isInvalid={!!errors.description} />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} min={10} isInvalid={!!errors.price} />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select value={category} onChange={e => setCategory(e.target.value)} isInvalid={!!errors.category}>
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rating (1 a 5)</Form.Label>
            <Form.Control type="number" value={rate} onChange={e => setRate(e.target.value)} min={1} max={5} step={0.1} isInvalid={!!errors.rate} />
            <Form.Control.Feedback type="invalid">{errors.rate}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cerrar</Button>
          <Button type="submit" variant="primary">Agregar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddProductModal;
