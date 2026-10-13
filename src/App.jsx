import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          
          {/* Encabezado */}
          <header className="bg-danger text-white text-center py-4">
            <h1>Refrescos Express</h1>
            <p>Tu tienda exclusiva de Coca-Cola y productos innovadores</p>
          </header>

          {/* Navegación */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
              <Link className="navbar-brand" to="/">Menú Principal</Link>
              <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="#coca-cola">Selección Coca-Cola</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#agua-polvo">Agua en Polvo</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#contacto">Contacto</a>
                  </li>
                </ul>
                
                <div className="d-flex gap-2 align-items-center mt-3 mt-lg-0">
                  <Link to="/cart" className="btn btn-outline-light btn-sm">🛒 Mi Carrito</Link>
                  <Link to="/login" className="btn btn-light btn-sm fw-bold">Iniciar Sesión / Registro</Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Vistas / Rutas */}
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-dark text-white text-center py-4 mt-5">
            <div className="container">
              <p className="mb-1">&copy; 2026 Refrescos Express - Proyecto Fullstack II.</p>
              <p className="small text-muted">
                Todos los derechos reservados. <a href="#" className="text-white">Términos y condiciones</a> | <a href="#" className="text-white">Política de Privacidad</a>
              </p>
            </div>
          </footer>

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;