export const esNombreValido = (nombre) => {
    const regexNombre = /^[a-zA-ZÀ-ÿ\s]+$/;
    return regexNombre.test(nombre);
};

export const esEmailValido = (email) => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+(\.[a-zA-Z]+)*\.(com|cl|net|org|edu|es|gov|[a-zA-Z]{2,})$/i;
    return regexEmail.test(email);
};

export const esPasswordValida = (password) => {
    return password.length >= 14;
};

export const esTarjetaValida = (numero) => {
    const regexTarjeta = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    return regexTarjeta.test(numero);
};

export const esFechaValida = (fecha) => {
    const regexFecha = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return regexFecha.test(fecha);
};

export const esCvvValido = (cvv) => {
    const regexCvv = /^\d{3}$/;
    return regexCvv.test(cvv);
};