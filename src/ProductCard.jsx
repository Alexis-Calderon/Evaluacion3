import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

export default function ProductCard({ producto, onShowDetails }) {
  return (
    <Card style={{ width: '18rem', padding: 0 }}>
      <div style={{ height: '200px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <Card.Img variant="top" src={producto.image} alt={producto.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
      </div>
      <Card.Body>
        <Badge bg="secondary" className="mb-2">{producto.category}</Badge>
        <Card.Title as="h6">{producto.title}</Card.Title>
        <h4>$ {producto.price.toLocaleString('es-CL')}</h4>
        <div className="mb-2">
          <span className="me-2">⭐ {producto.rating?.rate ?? '-'} / 5</span>
          <span className="text-muted">({producto.rating?.count ?? 0} valoraciones)</span>
        </div>
        <Button variant="link" onClick={() => onShowDetails(producto)}>
          Detalles
        </Button>
      </Card.Body>
    </Card>
  );
}

