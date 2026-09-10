document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('form-contacto');
    const mensajeExito = document.getElementById('exito-mensaje');

    const campos = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        mensaje: document.getElementById('mensaje')
    };

    const reglas = {
        nombre: function (valor) {
            if (valor.trim().length === 0) {
                return 'Por favor ingresa tu nombre.';
            }
            if (valor.trim().length < 3) {
                return 'El nombre debe tener al menos 3 caracteres.';
            }
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor.trim())) {
                return 'El nombre solo puede contener letras y espacios.';
            }
            return '';
        },
        email: function (valor) {
            if (valor.trim().length === 0) {
                return 'Por favor ingresa tu correo electrónico.';
            }
            const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!patronEmail.test(valor.trim())) {
                return 'Ingresa un correo válido, por ejemplo: nombre@ejemplo.com';
            }
            return '';
        },
        mensaje: function (valor) {
            if (valor.trim().length === 0) {
                return 'Por favor escribe un mensaje.';
            }
            if (valor.trim().length < 10) {
                return 'El mensaje debe tener al menos 10 caracteres.';
            }
            if (valor.trim().length > 500) {
                return 'El mensaje no puede superar los 500 caracteres.';
            }
            return '';
        }
    };

    function mostrarError(nombreCampo, mensajeError) {
        const spanError = formulario.querySelector('[data-error-for="' + nombreCampo + '"]');
        const grupo = campos[nombreCampo].closest('.grupo-input');

        if (mensajeError) {
            spanError.textContent = mensajeError;
            grupo.classList.add('campo-invalido');
        } else {
            spanError.textContent = '';
            grupo.classList.remove('campo-invalido');
        }
    }

    function validarCampo(nombreCampo) {
        const valor = campos[nombreCampo].value;
        const error = reglas[nombreCampo](valor);
        mostrarError(nombreCampo, error);
        return error === '';
    }

    Object.keys(campos).forEach(function (nombreCampo) {
        campos[nombreCampo].addEventListener('blur', function () {
            validarCampo(nombreCampo);
        });

        campos[nombreCampo].addEventListener('input', function () {
            const grupo = campos[nombreCampo].closest('.grupo-input');
            if (grupo.classList.contains('campo-invalido')) {
                validarCampo(nombreCampo);
            }
        });
    });

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();

        let formularioValido = true;

        Object.keys(campos).forEach(function (nombreCampo) {
            const esValido = validarCampo(nombreCampo);
            if (!esValido) {
                formularioValido = false;
            }
        });

        if (formularioValido) {
            mensajeExito.textContent = '¡Mensaje enviado correctamente! Gracias por escribir, ' + campos.nombre.value.trim() + '.';
            mensajeExito.classList.add('visible');
            formulario.reset();

            setTimeout(function () {
                mensajeExito.classList.remove('visible');
            }, 5000);
        } else {
            mensajeExito.classList.remove('visible');
        }
    });
});
