import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import AddProductModal from './AddProductModal';
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch('src/productos.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const handleAddProduct = (producto) => {
    const newProduct = {
      ...producto,
      id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div className="container my-5">
      <Navbar bg="primary" variant="dark" fixed="top" className="shadow-sm">
        <Container className="d-flex justify-content-end">
          <button className="btn btn-light fw-bold" onClick={() => setShowAddModal(true)}>
            <span className="me-2">➕</span> Nuevo producto
          </button>
        </Container>
      </Navbar>
      <header className="mb-4 text-center py-4 bg-light rounded shadow-sm">
        <div className="d-flex flex-column align-items-center">
          <img src="/Logo.png" alt="Logo" style={{ width: 150, height: 150 }} />
          <span className="text-muted fw-bold" style={{ fontSize: '1.1rem', letterSpacing: '2px', color: '#2c3e50' }}>Tu tienda online de moda, joyas y electrónica</span>
        </div>
      </header>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {products.map(producto => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onShowDetails={setSelectedProduct}
          />
        ))}
      </div>
      <ProductModal
        producto={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddOpinion={(opinion) => {
          if (!selectedProduct) return;
          setProducts(products =>
            products.map(p =>
              p.id === selectedProduct.id
                ? { ...p, opinions: [...(p.opinions || []), opinion] }
                : p
            )
          );
          setSelectedProduct(prev => prev ? { ...prev, opinions: [...(prev.opinions || []), opinion] } : prev);
        }}
      />
      <AddProductModal
        show={showAddModal}
        onAdd={handleAddProduct}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}

export default App;
