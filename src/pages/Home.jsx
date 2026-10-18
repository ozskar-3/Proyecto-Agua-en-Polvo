import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const productos = [
    // Coca-Cola Original
    { 
        id: 1,
        marca: 'COCA-COLA',
        nombre: 'COCA-COLA ORIGINAL RETORNABLE 8 X 3,0 LT.', 
        precio: 14500, 
        img: '/img/Coca-Cola.jpg', 
        desc: 'El sabor clásico e inconfundible de siempre en formato retornable.', 
        btnClass: 'btn-danger' 
    },
    { 
        id: 2,
        marca: 'COCA-COLA',
        nombre: 'COCA-COLA ORIGINAL DESECHABLE 6 X 3,0 LT.', 
        precio: 12900, 
        img: '/img/COCA_3_DES.jpg', 
        desc: 'El sabor clásico de siempre en envase desechable conveniente.', 
        btnClass: 'btn-danger' 
    },

    // Coca-Cola Zero
    { 
        id: 3,
        marca: 'COCA-COLA',
        nombre: 'COCA-COLA ZERO AZÚCAR RETORNABLE 8 X 2,0 LT.', 
        precio: 14500, 
        img: '/img/Coca-zero.jpg', 
        desc: 'Todo el sabor, cero azúcar en formato retornable.', 
        btnClass: 'btn-dark' 
    },
    { 
        id: 4,
        marca: 'COCA-COLA',
        nombre: 'COCA-COLA ZERO AZÚCAR DESECHABLE 6 X 3,0 LT.', 
        precio: 12900, 
        img: '/img/desechable_sin.webp', 
        desc: 'Todo el sabor, cero azúcar en práctico envase desechable.', 
        btnClass: 'btn-dark' 
    },

    // Fanta
    { 
        id: 5,
        marca: 'FANTA',
        nombre: 'FANTA NARANJA RETORNABLE 8 X 3,0 LT.', 
        precio: 13500, 
        img: '/img/fanta_re.jpg', 
        desc: 'Delicioso y vibrante sabor a naranja en formato retornable.', 
        btnClass: 'btn-warning text-dark' 
    },
    { 
        id: 6,
        marca: 'FANTA',
        nombre: 'FANTA NARANJA DESECHABLE 6 X 3,0 LT.', 
        precio: 11900, 
        img: '/img/fanta_des.jpg', 
        desc: 'Delicioso sabor a naranja en práctico envase desechable.', 
        btnClass: 'btn-warning text-dark' 
    },

    // Sprite
    { 
        id: 7,
        marca: 'SPRITE',
        nombre: 'SPRITE RETORNABLE 8 X 3,0 LT.', 
        precio: 13500, 
        img: '/img/Sprite.jpg', 
        desc: 'Refrescante sabor lima-limón en formato retornable.', 
        btnClass: 'btn-success' 
    },
    { 
        id: 8,
        marca: 'SPRITE',
        nombre: 'SPRITE DESECHABLE 6 X 3,0 LT.', 
        precio: 11900, 
        img: '/img/sprite_des.jpg', 
        desc: 'Refrescante sabor lima-limón en práctico envase desechable.', 
        btnClass: 'btn-success' 
    }
];

const productoAguaPolvo = {
    nombre: 'AGUA EN POLVO REFILL EXCLUSIVO 1 X 500 GR.',
    precio: 5000,
    img: '/img/AguaEnPolvo.jpeg',
    desc: 'Nuestro producto estrella. Solo tienes que añadir agua y... ¡listo! Tienes agua perfectamente hidratante. Ideal para campistas, astronautas o personas con mucho sentido del humor.'
};

export default function Home() {
    const { agregarAlCarrito } = useContext(CartContext);
    const location = useLocation();

    // Estado para filtrar por marca
    const [filtroMarca, setFiltroMarca] = useState('TODAS');

    // Lista de marcas disponibles únicamente en el proyecto
    const marcasDisponibles = ['TODAS', 'COCA-COLA', 'FANTA', 'SPRITE'];

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const elemento = document.getElementById(id);
            if (elemento) {
                setTimeout(() => {
                    if (elemento.scrollIntoView) {
                        elemento.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        }
    }, [location]);

    const [contacto, setContacto] = useState({ nombre: '', email: '', mensaje: '' });

    const handleSubmitContacto = (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Te responderemos a la brevedad.');
        setContacto({ nombre: '', email: '', mensaje: '' });
    };

    // Filtrar productos según la marca seleccionada
    const productosFiltrados = filtroMarca === 'TODAS' 
        ? productos 
        : productos.filter(p => p.marca === filtroMarca);

    return (
        <div className="container my-5">
            {/* Sección Catálogo de Bebidas con Filtro por Marca */}
            <section id="coca-cola" className="mb-5">
                <h2 className="text-center mb-4 text-uppercase fw-bold">Catálogo de Bebidas y Refrescos</h2>
                
                <div className="row g-4">
                    {/* APARTADO DE MARCAS (Estilo de la imagen de referencia) */}
                    <aside className="col-12 col-md-3">
                        <div className="p-3 bg-white border-end border-md rounded shadow-sm">
                            <h5 className="fw-bold text-uppercase mb-3 text-secondary border-bottom pb-2" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>
                                Filtro por Marca
                            </h5>
                            <ul className="list-unstyled mb-0" style={{ fontFamily: 'sans-serif' }}>
                                {marcasDisponibles.map((marca) => (
                                    <li key={marca} className="mb-3">
                                        <button
                                            type="button"
                                            className={`btn btn-link p-0 text-decoration-none fw-bold text-uppercase border-0 text-start w-100 ${
                                                filtroMarca === marca ? 'text-danger' : 'text-secondary'
                                            }`}
                                            style={{
                                                fontSize: '1rem',
                                                letterSpacing: '1px',
                                                cursor: 'pointer',
                                                transition: 'color 0.2s ease-in-out'
                                            }}
                                            onClick={() => setFiltroMarca(marca)}
                                        >
                                            {filtroMarca === marca && '• '}{marca}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* GRILLA DE PRODUCTOS */}
                    <div className="col-12 col-md-9">
                        <div className="row g-4">
                            {productosFiltrados.map(prod => (
                                <article className="col-12 col-sm-6 col-lg-4" key={prod.nombre}>
                                    <div className="card h-100 shadow-sm border-0 bg-light">
                                        <img 
                                            src={prod.img} 
                                            className="card-img-top p-3 img-fluid" 
                                            alt={prod.nombre} 
                                            style={{ maxHeight: '180px', objectFit: 'contain' }} 
                                        />
                                        <div className="card-body d-flex flex-column justify-content-between p-3">
                                            <div>
                                                <h3 className="card-title h6 text-uppercase fw-bold text-secondary mb-2" style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
                                                    {prod.nombre}
                                                </h3>
                                                <p className="card-text small text-muted mb-3" style={{ fontSize: '0.8rem' }}>{prod.desc}</p>
                                            </div>
                                            <button 
                                                className={`btn ${prod.btnClass} w-100 fw-bold mt-2 btn-sm py-2`} 
                                                onClick={() => agregarAlCarrito(prod)}
                                            >
                                                Añadir al carrito - ${prod.precio.toLocaleString('es-CL')}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <hr className="my-5" />

            {/* Sección Agua en Polvo */}
            <section id="agua-polvo" className="mb-5 my-5">
                <h2 className="text-center mb-4 text-primary text-uppercase fw-bold">¡Novedad Exclusiva: Agua en Polvo!</h2>
                <div className="row align-items-center g-4">
                    <div className="col-md-6">
                        <article className="p-3">
                            <h3 className="h4 fw-bold">{productoAguaPolvo.nombre}</h3>
                            <p className="lead fs-6">{productoAguaPolvo.desc}</p>
                            <button 
                                className="btn btn-primary btn-lg mt-3 fw-bold"
                                onClick={() => agregarAlCarrito(productoAguaPolvo)}
                            >
                                Comprar ahora - ${productoAguaPolvo.precio.toLocaleString('es-CL')}
                            </button>
                        </article>
                    </div>
                    <div className="col-md-6 text-center">
                        <img 
                            id="AguaEnPolvo" 
                            src={productoAguaPolvo.img} 
                            className="img-fluid rounded shadow" 
                            alt="Agua en Polvo" 
                            style={{ maxHeight: '300px' }}
                        />
                    </div>
                </div>
            </section>

            <hr className="my-5" />

            {/* Formulario de Contacto */}
            <section id="contacto" className="my-5">
                <h2 className="text-center mb-4 text-uppercase fw-bold">Contáctanos para Pedidos Especiales</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <form className="bg-light p-4 rounded shadow-sm border" onSubmit={handleSubmitContacto}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label fw-bold">Nombre Completo</label>
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
                                <label htmlFor="email" className="form-label fw-bold">Correo Electrónico</label>
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
                                <label htmlFor="mensaje" className="form-label fw-bold">Mensaje o Sugerencia</label>
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
                            <button type="submit" className="btn btn-dark w-100 fw-bold py-2">Enviar Consulta</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}