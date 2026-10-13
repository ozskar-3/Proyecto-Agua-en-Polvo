import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { esNombreValido, esTarjetaValida, esFechaValida, esCvvValido } from '../utils/validation';

export default function Checkout() {
    const { totalPagar, limpiarCarrito } = useContext(CartContext);
    const navigate = useNavigate();
    const [pago, setPago] = useState({ tipo: '', nombre: '', numero: '', exp: '', cvv: '' });

    const handleFormatoTarjeta = (valor) => {
        let num = valor.replace(/\D/g, '').substring(0, 16);
        let bloques = num.match(/.{1,4}/g);
        return bloques ? bloques.join('-') : '';
    };

    const handleFormatoExp = (valor) => {
        let exp = valor.replace(/\D/g, '').substring(0, 4);
        return exp.length > 2 ? `${exp.substring(0, 2)}/${exp.substring(2)}` : exp;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!pago.tipo) return alert('Selecciona un método de pago.');
        if (!esNombreValido(pago.nombre)) return alert('Nombre inválido.');
        if (!esTarjetaValida(pago.numero)) return alert('Tarjeta inválida (16 dígitos).');
        if (!esFechaValida(pago.exp)) return alert('Fecha inválida (MM/AA).');
        if (!esCvvValido(pago.cvv)) return alert('CVV inválido (3 dígitos).');

        alert('¡Pago realizado con éxito! Gracias por tu compra.');
        limpiarCarrito();
        navigate('/');
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <section className="col-lg-8">
                    <div className="card shadow-sm p-5">
                        <h2 className="text-center mb-4">Detalles de Pago</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="me-3"><input type="radio" name="tipo" onChange={() => setPago({...pago, tipo: 'credito'})} /> Tarjeta de Crédito</label>
                                <label><input type="radio" name="tipo" onChange={() => setPago({...pago, tipo: 'debito'})} /> Tarjeta de Débito</label>
                            </div>
                            <input type="text" placeholder="Nombre titular" className="form-control mb-3" value={pago.nombre} onChange={e => setPago({...pago, nombre: e.target.value.replace(/[0-9]/g, '')})} required />
                            <input type="text" placeholder="Número (1111-2222-3333-4444)" className="form-control mb-3" value={pago.numero} onChange={e => setPago({...pago, numero: handleFormatoTarjeta(e.target.value)})} required />
                            <div className="row mb-3">
                                <div className="col-6">
                                    <input type="text" placeholder="Expiración (MM/AA)" className="form-control" value={pago.exp} onChange={e => setPago({...pago, exp: handleFormatoExp(e.target.value)})} required />
                                </div>
                                <div className="col-6">
                                    <input type="text" placeholder="CVV" className="form-control" value={pago.cvv} onChange={e => setPago({...pago, cvv: e.target.value.replace(/\D/g, '').substring(0, 3)})} required />
                                </div>
                            </div>
                            <button className="btn btn-primary w-100 btn-lg">Confirmar Pago de ${totalPagar}</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}