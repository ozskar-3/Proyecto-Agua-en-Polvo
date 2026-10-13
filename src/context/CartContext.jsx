import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        const saved = localStorage.getItem('carrito');
        return saved ? JSON.parse(saved) : [];
    });
    const [descuento, setDescuento] = useState(0); // 0 = sin descuento, 0.2 = 20%

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto) => {
        setCarrito(prev => {
            const existente = prev.find(p => p.nombre === producto.nombre);
            if (existente) {
                return prev.map(p => p.nombre === producto.nombre ? { ...p, cantidad: p.cantidad + 1 } : p);
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
        alert(`"${producto.nombre}" fue añadido al carrito.`);
    };

    const eliminarDelCarrito = (index) => {
        setCarrito(prev => {
            const nuevoCarrito = [...prev];
            if (nuevoCarrito[index].cantidad > 1) {
                nuevoCarrito[index].cantidad -= 1;
            } else {
                nuevoCarrito.splice(index, 1);
            }
            return nuevoCarrito;
        });
    };

    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const totalPagar = subtotal - (subtotal * descuento);

    const limpiarCarrito = () => {
        setCarrito([]);
        setDescuento(0);
        localStorage.removeItem('carrito');
        localStorage.removeItem('totalFinalPagar');
    };

    return (
        <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, subtotal, totalPagar, setDescuento, limpiarCarrito }}>
            {children}
        </CartContext.Provider>
    );
};