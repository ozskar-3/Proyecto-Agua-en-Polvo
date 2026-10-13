import React, { useState } from 'react';
import { Link } from 'react_router_dom';

export default function Tienda({ alAgregarAlCarrito }) {
  // Estado para el formulario de contacto
  const [contacto, setContacto] = useState({ nombre: '', email: '', mensaje: '' });

  // Lista de productos extraídos del index.html
  const productosCocaCola = [
    {
      id: 1,
      nombre: 'Coca-Cola Original',
      precio: 2500,
      descripcion: 'El sabor clásico e inconfundible de siempre.',
      imagen: '/img/Coca-Cola.jpg',
      btnColor: 'btn-danger'
    },
    {
      id: 2,
      nombre: 'Coca-Cola Zero',
      precio: 2500,
      descripcion: 'Todo el sabor, cero azúcar.',
      imagen: '/img/Coca-zero.jpg',
      btnColor: 'btn-danger'
    },
    {
      id: 3,
      nombre: 'Sprite',
      precio: 2200,
      descripcion: 'Refrescante sabor lima-limón.',
      imagen: '/img/Sprite.jpg',
      btnColor: 'btn-success'
    }
  ];

  const productoAguaPolvo = {
    id: 4,
    nombre: 'Agua en Polvo',
    precio: 5000,
    descripcion: 'Nuestro producto estrella. Solo tienes que añadir agua y... ¡listo! Tienes agua perfectamente hidratante. Ideal para campistas, astronautas o personas con mucho sentido del humor.',
    imagen: '/img/AguaEnPolvo.jpeg'
  };

  const handleContactoSubmit = (e) => {
    e.preventDefault();
    if (!contacto.nombre || !contacto.email || !contacto.mensaje) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    alert('¡Gracias por tu mensaje! Te responderemos a la brevedad.');
    setContacto({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <>
      {/* Encabezado */}
      <header className="bg-danger text-white text-center py-4">
        <h1>Refrescos Express</h1>
        <p>Tu tienda exclusiva de Coca-Cola y productos innovadores</p>
      </header>

      {/* Navegación */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#coca-cola">Menú</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#coca-cola">Selección Coca-Cola</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#agua-polvo">Agua en Polvo</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contacto">Contacto</a>
              </li>
            </ul>
            
            <div className="d-flex gap-2 align-items-center mt-3 mt-lg-0">
              <Link to="/carrito" className="btn btn-outline-light btn-sm">🛒 Mi Carrito</Link>
              <Link to="/login" className="btn btn-light btn-sm fw-bold">Iniciar Sesión / Registro</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="container my-5">
        
        {/* Sección Coca-Cola */}
        <section id="coca-cola" className="mb-5">
          <h2 className="text-center mb-4">La Selección Clásica de Coca-Cola</h2>
          <div className="row">
            {productosCocaCola.map((prod) => (
              <article key={prod.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img src={prod.imagen} className="card-img-top" alt={prod.nombre} style={{ height: '220px', objectFit: 'contain' }} />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h3 className="card-title h5">{prod.nombre}</h3>
                      <p className="card-text">{prod.descripcion}</p>
                      <p className="fw-bold text-dark">${prod.precio.toLocaleString('es-CL')}</p>
                    </div>
                    <button 
                      className={`btn ${prod.btnColor} w-100 mt-2`}
                      onClick={() => alAgregarAlCarrito(prod)}
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <hr />

        {/* Sección Agua en Polvo */}
        <section id="agua-polvo" className="mb-5 my-5">
          <h2 className="text-center mb-4 text-primary">¡Novedad Exclusiva: Agua en Polvo!</h2>
          <div className="row align-items-center">
            <div className="col-md-6">
              <article>
                <h3>¿Qué es el Agua en Polvo?</h3>
                <p>{productoAguaPolvo.descripcion}</p>
                <p className="h4 text-primary fw-bold">${productoAguaPolvo.precio.toLocaleString('es-CL')}</p>
                <button 
                  className="btn btn-primary btn-lg mt-3"
                  onClick={() => alAgregarAlCarrito(productoAguaPolvo)}
                >
                  Comprar ahora
                </button>
              </article>
            </div>
            <div className="col-md-6 text-center">
              <img 
                src={productoAguaPolvo.imagen} 
                className="img-fluid rounded shadow" 
                alt="Agua en Polvo" 
                style={{ maxHeight: '300px' }}
              />
            </div>
          </div>
        </section>

        <hr />

        {/* Sección Contacto */}
        <section id="contacto" className="my-5">
          <h2 className="text-center mb-4">Contáctanos para Pedidos Especiales</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form className="bg-light p-4 rounded shadow-sm" onSubmit={handleContactoSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="nombre" 
                    placeholder="Ej: Juan Pérez" 
                    value={contacto.nombre}
                    onChange={(e) => setContacto({ ...contacto, nombre: e.target.value })}
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="ejemplo@correo.com" 
                    value={contacto.email}
                    onChange={(e) => setContacto({ ...contacto, email: e.target.value })}
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label">Mensaje o Sugerencia</label>
                  <textarea 
                    className="form-control" 
                    id="mensaje" 
                    rows="4" 
                    placeholder="Escribe aquí tu consulta..."
                    value={contacto.mensaje}
                    onChange={(e) => setContacto({ ...contacto, mensaje: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-dark w-100">Enviar Consulta</button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p className="mb-1">&copy; 2026 Refrescos Express - Proyecto Fullstack II.</p>
          <p className="small text-muted">
            Todos los derechos reservados. <a href="#" className="text-white">Términos y condiciones</a> | <a href="#" class="text-white">Política de Privacidad</a>
          </p>
        </div>
      </footer>
    </>
  );
}