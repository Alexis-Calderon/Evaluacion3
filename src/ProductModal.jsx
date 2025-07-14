import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import OpinionesSection from './OpinionesSection';

import { useState } from 'react';

export default function ProductModal({ producto, onClose, onAddOpinion }) {
    const [username, setUsername] = useState('');
    const [opinion, setOpinion] = useState('');
    const [rating, setRating] = useState('');
    const [error, setError] = useState('');

    if (!producto) return null;

    const handleAddOpinion = (e) => {
        e.preventDefault();
        if (!username || !opinion || !rating || rating < 1 || rating > 5) {
            setError('Completa todos los campos y asegúrate que el rating esté entre 1 y 5');
            return;
        }
        const nuevaOpinion = {
            username,
            opinion,
            rating: parseInt(rating)
        };
        onAddOpinion(nuevaOpinion);
        setUsername('');
        setOpinion('');
        setRating('');
        setError('');
    };

    return (
        <Modal show centered onHide={onClose} backdrop="static" animation>
            <Modal.Body>
                <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1.5rem 0' }}>
                    <img src={producto.image} alt={producto.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <h4 className="mb-3">{producto.title}</h4>
                <p>{producto.description}</p>
                <h1>$ {producto.price.toLocaleString('es-CL')}</h1>
                <OpinionesSection opiniones={producto.opinions || []} />
                <hr />
                <h5>Agregar opinión</h5>
                <Form onSubmit={handleAddOpinion} className="mb-3">
                    <Form.Group className="mb-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Opinión</Form.Label>
                        <Form.Control as="textarea" rows={2} value={opinion} onChange={e => setOpinion(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Rating (1 a 5)</Form.Label>
                        <Form.Control type="number" min={1} max={5} value={rating} onChange={e => setRating(e.target.value)} required />
                    </Form.Group>
                    {error && <div className="text-danger mb-2">{error}</div>}
                    <Button type="submit" variant="primary">Agregar opinión</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}

