import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { esNombreValido, esEmailValido, esPasswordValida } from '../utils/validation';

export default function Login() {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [regForm, setRegForm] = useState({ nombre: '', email: '', password: '' });

    const handleLogin = (e) => {
        e.preventDefault();
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const user = usuarios.find(u => u.email === loginForm.email && u.password === loginForm.password);
        
        if (user) {
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(user));
            alert(`¡Bienvenido/a, ${user.nombre}!`);
            navigate('/');
        } else {
            alert('Credenciales incorrectas o usuario no existe.');
        }
    };

    const handleRegistro = (e) => {
        e.preventDefault();
        if (!esNombreValido(regForm.nombre)) return alert('Nombre inválido.');
        if (!esEmailValido(regForm.email)) return alert('Correo inválido.');
        if (!esPasswordValida(regForm.password)) return alert('Contraseña requiere min 14 caracteres.');

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuarios.some(u => u.email === regForm.email)) return alert('El correo ya existe.');

        usuarios.push(regForm);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Usuario creado con éxito. Ya puedes iniciar sesión.');
        setRegForm({ nombre: '', email: '', password: '' });
    };

    return (
        <div className="container my-5">
            <div className="row g-4 justify-content-center">
                <section className="col-md-6">
                    <div className="card shadow-sm p-4">
                        <h2 className="h4 text-center">Iniciar Sesión</h2>
                        <form onSubmit={handleLogin}>
                            <input type="email" placeholder="Correo" className="form-control mb-3" onChange={e => setLoginForm({...loginForm, email: e.target.value})} required />
                            <input type="password" placeholder="Contraseña" className="form-control mb-3" onChange={e => setLoginForm({...loginForm, password: e.target.value})} required />
                            <button className="btn btn-danger w-100">Entrar</button>
                        </form>
                    </div>
                </section>
                <section className="col-md-6">
                    <div className="card shadow-sm p-4 bg-dark text-white">
                        <h2 className="h4 text-center">Crear Usuario</h2>
                        <form onSubmit={handleRegistro}>
                            <input type="text" placeholder="Nombre (Sin números)" className="form-control mb-3" value={regForm.nombre} onChange={e => setRegForm({...regForm, nombre: e.target.value.replace(/[0-9]/g, '')})} required />
                            <input type="email" placeholder="Correo" className="form-control mb-3" value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} required />
                            <input type="password" placeholder="Contraseña (Min 14)" className="form-control mb-3" value={regForm.password} onChange={e => setRegForm({...regForm, password: e.target.value})} required />
                            <button className="btn btn-light w-100">Registrarse</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}