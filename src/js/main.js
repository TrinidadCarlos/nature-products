window.onload = () => {    
    const menuHamburguesa = document.querySelector('#menuHamburguesa').addEventListener('click', toggleMenu);
    const enlaces = document.querySelectorAll('#navegacion a');
    posicion(enlaces);
    const secciones = document.querySelectorAll('.seccion');
    animacion(secciones);
    const formulario = document.querySelector('#formulario').addEventListener('submit', validarForm);
}

function toggleMenu () {
    document.querySelector('#navegacion').classList.toggle('mostrar-navegacion');
    document.querySelector('body').classList.toggle('overflow');
}

function posicion(enlaces){
    enlaces.forEach((link, i, arr) => {
        link.addEventListener('click', (e) => {
            //al dar click se revisa que algún otro enlace contenga la clase "active" y si la tiene, se le quita
            arr.forEach(element => {
                element.classList.contains('active') ? element.classList.remove('active'): null ;
            });

            // una vez se quito la clase "active" del elemento anterior, se agregar al nuevo (sobre el que se dió click)
            !e.target.classList.contains('active') ? e.target.classList.add('active') : null;

        });
    });
}

function animacion(secciones){
    
    const options = {
        rootMargin: '20px'
    }
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach( element => {
            if (element.isIntersecting) {
                element.target.firstElementChild.classList.add('mostrar-contenido');
            }
        });
    }, options);
    
    secciones.forEach(seccion => {
        observer.observe(seccion);
    });
        
}


function validarForm(e){
    e.preventDefault();
    const r =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const mensaje= document.querySelector('#mensaje').value;

    if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
        Swal.fire(
            'Existen campos vacíos',
            'No se permiten campos vacíos',
            'error'
          );
          return;
    }
    if (!r.test(email)) {
        Swal.fire(
            'Revisa tu correo',
            'Este correo no parece ser válido',
            'warning'
          );
          return;
    }
    
    Swal.fire(
        'Listo',
        'Tu correo será enviado... (esto es una simulacion)',
        'success'
    );


}