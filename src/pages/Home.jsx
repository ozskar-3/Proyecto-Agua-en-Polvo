import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const productos = [
    { nombre: 'Coca-Cola Original', precio: 2500, img: '/img/Coca-Cola.jpg', desc: 'El sabor clásico e inconfundible de siempre.', btnClass: 'btn-danger' },
    { nombre: 'Coca-Cola Zero', precio: 2500, img: '/img/Coca-zero.jpg', desc: 'Todo el sabor, cero azúcar.', btnClass: 'btn-danger' },
    { nombre: 'Sprite', precio: 2200, img: '/img/Sprite.jpg', desc: 'Refrescante sabor lima-limón.', btnClass: 'btn-success' }
];

const productoAguaPolvo = {
    nombre: 'Agua en Polvo',
    precio: 5000,
    img: '/img/AguaEnPolvo.jpeg',
    desc: 'Nuestro producto estrella. Solo tienes que añadir agua y... ¡listo! Tienes agua perfectamente hidratante. Ideal para campistas, astronautas o personas con mucho sentido del humor.'
};

export default function Home() {
    const { agregarAlCarrito } = useContext(CartContext);

    // Estado para el formulario de contacto
    const [contacto, setContacto] = useState({ nombre: '', email: '', mensaje: '' });

    const handleSubmitContacto = (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Te responderemos a la brevedad.');
        setContacto({ nombre: '', email: '', mensaje: '' });
    };

    return (
        <div className="container my-5">
            {/* Sección Selección Coca-Cola */}
            <section id="coca-cola" className="mb-5">
                <h2 className="text-center mb-4">La Selección Clásica de Coca-Cola</h2>
                <div className="row">
                    {productos.map(prod => (
                        <article className="col-md-4 mb-4" key={prod.nombre}>
                            <div className="card h-100 shadow-sm">
                                <img src={prod.img} className="card-img-top p-3" alt={prod.nombre} style={{ maxHeight: '220px', objectFit: 'contain' }} />
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h3 className="card-title h5">{prod.nombre}</h3>
                                        <p className="card-text">{prod.desc}</p>
                                    </div>
                                    <button 
                                        className={`btn ${prod.btnClass} w-100 mt-3`} 
                                        onClick={() => agregarAlCarrito(prod)}
                                    >
                                        Añadir al carrito - ${prod.precio.toLocaleString('es-CL')}
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <hr className="my-5" />

            {/* Sección Novedad Agua en Polvo */}
            <section id="agua-polvo" className="mb-5 my-5">
                <h2 className="text-center mb-4 text-primary">¡Novedad Exclusiva: Agua en Polvo!</h2>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <article>
                            <h3>¿Qué es el Agua en Polvo?</h3>
                            <p>{productoAguaPolvo.desc}</p>
                            <button 
                                className="btn btn-primary btn-lg mt-3"
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

            {/* Sección Formulario de Contacto */}
            <section id="contacto" className="my-5">
                <h2 className="text-center mb-4">Contáctanos para Pedidos Especiales</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form className="bg-light p-4 rounded shadow-sm" onSubmit={handleSubmitContacto}>
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
        </div>
    );
}