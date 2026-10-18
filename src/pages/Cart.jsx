import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const { carrito, eliminarDelCarrito, subtotal, totalPagar, setDescuento } = useContext(CartContext);
    const [cupon, setCupon] = useState('');
    const navigate = useNavigate();

    const aplicarCupon = (e) => {
        e.preventDefault();
        if (cupon.toUpperCase() === 'DUOC2026') {
            setDescuento(0.20);
            alert('¡Cupón aplicado con éxito! Tienes un 20% de descuento.');
        } else {
            alert('Código de cupón no válido.');
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <section className="col-lg-8 mb-4">
                    <h2 className="mb-4">Productos seleccionados</h2>
                    {carrito.length === 0 ? <p className="text-muted">Tu carrito está vacío.</p> : 
                        carrito.map((prod, index) => (
                            <article className="card mb-3 shadow-sm" key={index}>
                                <div className="row g-0 align-items-center">
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <img src={prod.img} className="card-img-top p-3" alt={prod.nombre} style={{ maxHeight: '220px', objectFit: 'contain' }} />
                                            <h5 className="card-title">{prod.nombre}</h5>
                                            <p className="mb-1">Precio: ${prod.precio} x {prod.cantidad}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-end p-3">
                                        <p className="fw-bold mb-2">${prod.precio * prod.cantidad}</p>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarDelCarrito(index)}>Eliminar</button>
                                    </div>
                                </div>
                            </article>
                        ))
                    }
                </section>
                
                <section className="col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title h4 mb-4">Resumen</h2>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal</span><span>${subtotal}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <strong>Total a Pagar</strong><strong>${totalPagar}</strong>
                            </div>
                            <form onSubmit={aplicarCupon} className="mb-4">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Ej: DUOC2026" value={cupon} onChange={e => setCupon(e.target.value)} required />
                                    <button type="submit" className="btn btn-secondary">Aplicar</button>
                                </div>
                            </form>
                            <button 
                                className="btn btn-success w-100 btn-lg" 
                                onClick={() => carrito.length > 0 ? navigate('/checkout') : alert('Tu carrito está vacío')}
                            >Proceder al Pago</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}