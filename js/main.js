function mostrarSeccion(seccion) {
    // Se busca todas las secciones con la clase 'seccion'
    const secciones = document.querySelectorAll('.seccion');
    
    // Bucle para ocultar las secciones
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].style.display = 'none';
    }

    // Se muestra la sección seleccionada
    const seccionSeleccionada = document.getElementById(seccion);
    if (seccionSeleccionada) {
        seccionSeleccionada.style.display = 'block';
    }
}