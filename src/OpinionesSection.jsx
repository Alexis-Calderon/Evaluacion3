import ListGroup from 'react-bootstrap/ListGroup';

export default function OpinionesSection({ opiniones }) {
  if (!opiniones || opiniones.length === 0) {
    return <p className="text-muted">No hay opiniones para este producto.</p>;
  }
  return (
    <div className="mt-4">
      <h5>Opiniones de clientes</h5>
      <ListGroup variant="flush">
        {opiniones.map((op, idx) => (
          <ListGroup.Item key={idx}>
            <strong>{op.username}</strong> <span className="text-warning">{'★'.repeat(op.rating)}</span>
            <br />
            <span>{op.opinion}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
