    // Array de las naves
    let naves = [
    { nombre: "Aerodeslizador T-47", tipo: "Transporte", velocidad: 0, tripulacion: 2, estado: "Operativa", imagen: "img/t47.jpg" },
    { nombre: "Ala-A", tipo: "Caza", velocidad: 120, tripulacion: 1, estado: "En Reparación", imagen: "img/ala-a.jpg" },
    { nombre: "Ala-B", tipo: "Caza", velocidad: 91, tripulacion: 1, estado: "Operativa", imagen: "img/ala-b.jpg" },
    { nombre: "Ala-U", tipo: "Transporte", velocidad: 70, tripulacion: 2, estado: "Operativa", imagen: "img/ala-u.jpg" },
    { nombre: "Ala-X", tipo: "Caza", velocidad: 100, tripulacion: 1, estado: "Destruida", imagen: "img/ala-x.jpg" },
    { nombre: "Ala-Y", tipo: "Caza", velocidad: 80, tripulacion: 2, estado: "Operativa", imagen: "img/ala-y.jpg" },
    { nombre: "Cabeza de Martillo", tipo: "Fragata", velocidad: 55, tripulacion: 120, estado: "Operativa", imagen: "img/martillo.jpg" },
    { nombre: "Espíritu", tipo: "Transporte", velocidad: 70, tripulacion: 6, estado: "Destruida", imagen: "img/espiritu.jpg" },
    { nombre: "Halcón de Ébano", tipo: "Transporte", velocidad: 75, tripulacion: 12, estado: "Operativa", imagen: "img/ebano.jpg" },
    { nombre: "Halcón Milenario", tipo: "Transporte", velocidad: 75, tripulacion: 10, estado: "Operativa", imagen: "img/halcon.jpg" },
    { nombre: "Hogar Uno", tipo: "Fragata", velocidad: 40, tripulacion: 5400, estado: "En Reparación", imagen: "img/hogaruno.jpg" },
    { nombre: "Tantive IV", tipo: "Fragata", velocidad: 60, tripulacion: 160, estado: "Operativa", imagen: "img/tantive.jpg" }
    ];
    
    //Establecer orden para ordenar por velocidad
    let ordenAscendente = true;

    // Carga de localStorage para pilotos y misiones
    let pilotos = JSON.parse(localStorage.getItem('pilotos'));
    if (pilotos === null) {
        pilotos = [];
    }

    let misiones = JSON.parse(localStorage.getItem('misiones')) || [];

// Función para mostrar una sección cuandos se haga click sobre ella 
function mostrarSeccion(seccion) {
    // Se busca todas las secciones con la clase 'seccion'
    const secciones = document.querySelectorAll('.seccion');
    
    // Bucle para ocultar las secciones
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].style.display = 'none';
    }

    // Se muestra la sección seleccionada
    let seccionSeleccionada = document.getElementById(seccion);
    if (seccionSeleccionada) {
        seccionSeleccionada.style.display = 'block';
    }

    if (seccion == 'hangar') {
        cargarHangar(naves);
    } else if (seccion == 'pilotos'){
        cargarSelectNaves();
        cargarPilotos();
    } else if (seccion == 'misiones') {
        cargarSelectPilotos();
        cargarMisiones();
    } else if (seccion == 'mando') {
        cargarDashboard();
    }
}

// Sección Hangar
// Función para poner las 12 imágenes
function cargarHangar(listaNaves) {
    let parrilla = document.getElementById('parrillaNaves');
    let contador = document.getElementById('contador');
    parrilla.innerHTML = ""; 

    for (let i = 0; i < listaNaves.length; i++) {
        let nave = listaNaves[i];
        // Se busca la posición real de la nave en el array original
        let indiceReal = naves.indexOf(nave);
        // Añadir imagen y nombre
        parrilla.innerHTML += 
            '<div class="fotosNaves" onclick="mostrarDetalles(' + indiceReal + ')">' +
                '<img src="' + nave.imagen + '" alt="' + nave.nombre + '">' +
                '<p>' + nave.nombre + '</p>' +
            '</div>';
    }

    // Contador para ver las naves visibles
    if (contador) {
        contador.innerText = "Naves visibles: " + listaNaves.length;
    }
}

// Función que combina buscador y filtro por tipo
function filtrarNaves() {
    let texto = document.getElementById('buscador').value.toLowerCase();
    let tipo = document.getElementById('filtroTipo').value;

    let filtradas = naves.filter(function(nave) {
        let coincideNombre = nave.nombre.toLowerCase().includes(texto);
        let coincideTipo = (tipo === "todos" || nave.tipo === tipo);
        return coincideNombre && coincideTipo;
    });

    cargarHangar(filtradas);
}

// Función para ordenar por velocidad
function ordenarPorVelocidad() {
    ordenAscendente = !ordenAscendente; // Cambiamos el sentido

    naves.sort(function(a, b) {
        if (ordenAscendente) {
            return a.velocidad - b.velocidad;
        } else {
            return b.velocidad - a.velocidad;
        }
    });

    filtrarNaves(); // Filtrar para que se mantengan los filtros aplicados
}

// Función para mostrar la ficha técnica con los detalles
function mostrarDetalles(indice) {
    let naveSeleccionada = naves[indice];
    let detalles = document.getElementById('detalles');

    // Añadir toda la información de la nave en la parte de la derecha
    detalles.innerHTML = 
        '<div class="navesDetalles">' +
            '<img src="' + naveSeleccionada.imagen + '" style="width: 100%">' +
            '<h2>' + naveSeleccionada.nombre + '</h2>' +
            '<p><strong>Tipo:</strong> ' + naveSeleccionada.tipo + '</p>' +
            '<p><strong>Velocidad:</strong> ' + naveSeleccionada.velocidad + ' MGLT</p>' +
            '<p><strong>Tripulación máxima:</strong> ' + naveSeleccionada.tripulacion + '</p>' + 
            '<p><strong>Estado:</strong> ' + naveSeleccionada.estado + '</p>' +
        '</div>';
    }

// Sección pilotos
// Función para generar select de naves
function cargarSelectNaves() {
    let select = document.getElementById('navePiloto');
    select.innerHTML = '<option value="">Asignar nave...</option>';
    
    // Bucle para añadir las naves
    for (let i = 0; i < naves.length; i++) {
        let nave = naves[i];

        if(nave.estado === "Operativa") {
            select.innerHTML += '<option value="' + nave.nombre + '">' + nave.nombre + '</option>';
        }
    }
}

// Función para cargar la tabla de pilotos
function cargarPilotos() {
    let tabla = document.getElementById('listaPilotos');
    tabla.innerHTML = "";
    
    for (let i = 0; i < pilotos.length; i++) {
        let piloto = pilotos[i];
        let pilotoEstado = piloto.estado.toLowerCase();

        tabla.innerHTML += 
            '<tr>' +
                '<td>' + piloto.nombre + '</td>' +
                '<td>' + piloto.rango + '</td>' +
                '<td>' + piloto.nave + '</td>' +
                '<td>' + piloto.victorias + '</td>' +
                '<td class="estado-' + pilotoEstado + '">' + piloto.estado.toUpperCase() + '</td>' +
                '<td>' +
                    '<button class="botones" onclick="editarPiloto(' + i + ')">Editar</button>' +
                    '<button class="botones "onclick="eliminarPiloto(' + i + ')">Eliminar</button>' +
                '</td>' +
            '</tr>';
    }
}

// Función para crear y editar pilotos
function guardarPiloto() {
    let nombre = document.getElementById('nombrePiloto').value;
    let rango = document.getElementById('rangoPiloto').value;
    let nave = document.getElementById('navePiloto').value;
    let victorias = parseInt(document.getElementById('victoriasPiloto').value);
    let estado = document.getElementById('estadoPiloto').value;
    let actualizarPosicion = parseInt(document.getElementById('actualizarPosicion').value);

    // Comprobar que todos los datos son correctos
    if (nombre === "" || rango === "" || nave === "" || isNaN(victorias) || victorias < 0) {
        alert("Error: Todos los campos son obligatorios y las victorias deben ser un número positivo.");
        return;
    }

    // Crear un nuevo piloto
    let nuevoPiloto = { 
        nombre: nombre, 
        rango: rango, 
        nave: nave, 
        victorias: victorias, 
        estado: estado 
    };

    if (actualizarPosicion === -1) {
        pilotos.push(nuevoPiloto); // Añadir nuevo
    } else {
        pilotos[actualizarPosicion] = nuevoPiloto; // Actualizar piloto existente
        document.getElementById('actualizarPosicion').value = "-1";
        document.getElementById('guardar').innerText = "Registrar Piloto";
    }

    actualizarDatos();
    limpiarFormularioPilotos();
}

// Función para eliminar piloto con confirmación
function eliminarPiloto(posicionPiloto) {
    if (confirm("¿Estás seguro de que deseas eliminar a este piloto?")) {
        pilotos.splice(posicionPiloto, 1);
        actualizarDatos();
    }
}

// Función para cargar datos en el formulario para editar
function editarPiloto(posicionPiloto) {
    let p = pilotos[posicionPiloto];
    document.getElementById('nombrePiloto').value = p.nombre;
    document.getElementById('rangoPiloto').value = p.rango;
    document.getElementById('navePiloto').value = p.nave;
    document.getElementById('victoriasPiloto').value = p.victorias;
    document.getElementById('estadoPiloto').value = p.estado;
    
    document.getElementById('actualizarPosicion').value = posicionPiloto;
    document.getElementById('guardar').innerText = "Guardar Cambios";
}

// Función para ir actualizando los datos y que se queden guardados al recargar la página
function actualizarDatos() {
    localStorage.setItem('pilotos', JSON.stringify(pilotos));
    cargarPilotos();
}

// Función para limpiar el formulario
function limpiarFormularioPilotos() {
    document.getElementById('nombrePiloto').value = "";
    document.getElementById('rangoPiloto').value = "";
    document.getElementById('navePiloto').value = "";
    document.getElementById('victoriasPiloto').value = "";
    document.getElementById('estadoPiloto').value = "activo";
}

//Sección misiones
// Función para llenar el select de pilotos (solo los activos)
function cargarSelectPilotos() {
    let select = document.getElementById('pilotoMision');
    select.innerHTML = '<option value="">Asignar piloto activo...</option>';
    
    // Bucle para añadir los pilotos cuyo estado sea activo
    for (let i = 0; i < pilotos.length; i++) {
        if (pilotos[i].estado.toLowerCase() === 'activo') {
            select.innerHTML += '<option value="' + pilotos[i].nombre + '">' + pilotos[i].nombre + '</option>';
        }
    }
}

// Función para crear misiones
function crearMision() {
    let nombre = document.getElementById('nombreMision').value;
    let desc = document.getElementById('descripcionMision').value;
    let piloto = document.getElementById('pilotoMision').value;
    let dif = document.getElementById('dificultadMision').value;
    let fecha = document.getElementById('fechaMision').value;

// Comprobar que todos los datos son correctos
    if (nombre === "" || desc === "" || piloto === "" || dif === "todos" || fecha === "") {
        alert("Todos los campos son obligatorios para lanzar una misión.");
        return;
    }

// Crear misión
    let nuevaMision = {
        nombre: nombre,
        descripcion: desc,
        piloto: piloto,
        dificultad: dif,
        fecha: fecha,
        estado: 'pendiente' // Siempre empiezan aquí
    };

    misiones.push(nuevaMision); // Añadir misión
    actualizarMisiones();
    limpiarFormularioMisiones();
}

// Función para cargar las misiones
function cargarMisiones() {
    let filtro = document.getElementById('filtroDificultad').value;
    
    // Contenedores
    let contadorPendientes = document.getElementById('listaMisionesPendientes');
    let contadorEnCurso = document.getElementById('listaMisionesEnCurso');
    let contadorCompletadas = document.getElementById('listaMisionesCompletadas');

    // Limpiar columnas
    contadorPendientes.innerHTML = "";
    contadorEnCurso.innerHTML = "";
    contadorCompletadas.innerHTML = "";

    let contadorMisionesPendientes = 0, contadorMisionesEnCurso = 0, contadorMisionesCompletadas = 0;

    for (let i = 0; i < misiones.length; i++) {
        let m = misiones[i];

        let dificultadMision = m.dificultad.toLowerCase();
        let dificultadFiltro = filtro.toLowerCase();

        // Cambiar fecha para mostrarlo en formato dia, mes y año
        let fechaCambiada = m.fecha;
        if(m.fecha) {
            let partes = m.fecha.split("-");
            fechaCambiada = partes[2] + "/" + partes[1] + "/" + partes[0];
        }

        // Aplicar filtro de dificultad
        if (dificultadFiltro === "todos" || dificultadMision === dificultadFiltro) {
        let tarjeta = 
            '<div class="tarjetaMision ' + dificultadMision + '">' +
                '<h2>' + m.nombre + '</h2>' +
                '<h4>' + m.descripcion + '</h4>' +
                '<p>Piloto: ' + m.piloto + ' | Dificultad: ' + m.dificultad.toUpperCase() + '</p>' +
                '<p>Fecha: ' + fechaCambiada + '</p>' +
                '<div class="botonesMisiones">';
        
        // Botones de movimiento según su estado
        if (m.estado === 'pendiente') {
            tarjeta += '<button class="botones" onclick="cambiarEstadoMision(\'' + m.nombre + '\', \'enCurso\')">Empezar Misión →</button>';            
            contadorMisionesPendientes++;
        } else if (m.estado === 'enCurso') {
            tarjeta += '<button class="botones"onclick="cambiarEstadoMision(\'' + m.nombre + '\', \'completada\')">Finalizar Misión →</button>';            
            contadorMisionesEnCurso++;
        } else {
            contadorMisionesCompletadas++;
        }

        tarjeta += '<button class="botones" onclick="borrarMision(\'' + m.nombre + '\')">Eliminar</button>';        
        tarjeta += '</div></div>';

        // Crear tarjeta en la columna correcta
        if (m.estado === 'pendiente') contadorPendientes.innerHTML += tarjeta;
        if (m.estado === 'enCurso') contadorEnCurso.innerHTML += tarjeta;
        if (m.estado === 'completada') contadorCompletadas.innerHTML += tarjeta;
    }

    // Actualizar contadores de las misiones
    document.getElementById('contadorMisionesPendientes').innerText = contadorMisionesPendientes;
    document.getElementById('contadorMisionesEnCurso').innerText = contadorMisionesEnCurso;
    document.getElementById('contadorMisionesCompletadas').innerText = contadorMisionesCompletadas;
    }
}

// Función para cambiar el estado de una misión
function cambiarEstadoMision(nombreMision, nuevoEstado) {
    for (let i = 0; i < misiones.length; i++) {
        if (misiones[i].nombre === nombreMision) {
            misiones[i].estado = nuevoEstado;
            actualizarMisiones();
            return;
        }
    }
}

// Función para borrar misión con confirmación
function borrarMision(nombreMision) {
    if (confirm("¿Abortar misión definitivamente?")) {
        for (let i = 0; i < misiones.length; i++) {
            if (misiones[i].nombre === nombreMision) {
                misiones.splice(i, 1);
            }
        }
        actualizarMisiones();
    }
}

// Función para actualizar las misiones cuando se cree una nueva
function actualizarMisiones() {
    localStorage.setItem('misiones', JSON.stringify(misiones));
    cargarMisiones();
}

// Función para limpiar el formulario
function limpiarFormularioMisiones() {
    document.getElementById('nombreMision').value = "";
    document.getElementById('descripcionMision').value = "";
    document.getElementById('pilotoMision').value = "";
    document.getElementById('dificultadMision').value = "todos";
    document.getElementById('fechaMision').value = "";
}

// Sección Dashboard
function cargarDashboard() {
    // Estadísticas de Naves
    let operativas = 0, reparacion = 0, destruidas = 0;
    let naveMasRapida = naves[0];

    // Se muestra el estado de las naves y la nave con mayor velocidad
    // Además, en caso de la nave más rápida debe estar operativa
    for (let i = 0; i < naves.length; i++) {
        let n = naves[i];
        let estadoNave = n.estado.toLowerCase();
        
        if (estadoNave === "operativa") operativas++;
        else if (estadoNave === "en reparación") reparacion++;
        else if (estadoNave === "destruida") destruidas++;
        if (estadoNave == "operativa" && n.velocidad > naveMasRapida.velocidad) {
            naveMasRapida = n;
        }
    }   

    document.getElementById('totalNaves').innerText = "Total naves: " + naves.length;
    document.getElementById('estadoNaves').innerHTML = 
        '<li>Operativas: ' + operativas + '</li>' +
        '<li>En reparación: ' + reparacion + '</li>' +
        '<li>Destruidas: ' + destruidas + '</li>';
    document.getElementById('naveMasRapida').innerHTML = "<strong>Nave más rápida:</strong> " + naveMasRapida.nombre + " (" + naveMasRapida.velocidad + " MGLT)";

    // Estadísticas de Pilotos
    let activos = 0, heridos = 0, kia = 0;
    let maxVictorias = 0;

    // Se muestra el estado de los pilotos y el piloto con más victorias
    for (let i = 0; i < pilotos.length; i++) {
        let p = pilotos[i];
        let est = p.estado.toLowerCase();
        if (est === "activo") activos++;
        if (est === "herido") heridos++;
        if (est === "kia") kia++;
        if (p.victorias > maxVictorias) {
            maxVictorias = p.victorias;
        } 
    }

    // Se muestra el piloto con más victorias y en caso de empate entre 2 pilotos
    let nombresMejores = "";
    let contadorMejores = 0;

    if (maxVictorias > 0) {
        for (let i = 0; i < pilotos.length; i++) {
            if (pilotos[i].victorias === maxVictorias) {
                if (contadorMejores > 0) {
                    nombresMejores = nombresMejores + ", ";
                }
                nombresMejores = nombresMejores + pilotos[i].nombre;
                contadorMejores++;
            }
        }
    } else {
        nombresMejores = "Ninguno";
    }

    document.getElementById('totalPilotos').innerText = "Total pilotos: " + pilotos.length;
    document.getElementById('estadoPilotos').innerHTML = 
        '<li>Activos: ' + activos + '</li>' +
        '<li>Heridos: ' + heridos + '</li>' +
        '<li>KIA: ' + kia + '</li>';
    document.getElementById('mejorPiloto').innerHTML = "<strong>As de la Alianza:</strong> " + nombresMejores + " (" + maxVictorias + " victorias)";

    // Estadísticas de Misiones y Barra de Progreso
    let pendiente = 0, enCurso = 0, completada = 0;

    // Se muestra el estado de las misiones y una barra con el porcentaje de misiones completadas
    for (let i = 0; i < misiones.length; i++) {
        let m = misiones[i];
        if (m.estado === 'pendiente') pendiente++;
        if (m.estado === 'enCurso') enCurso++;
        if (m.estado === 'completada') completada++;
    }

    document.getElementById('estadoMisiones').innerHTML = 
        '<li>Pendientes: ' + pendiente + '</li>' +
        '<li>En curso: ' + enCurso + '</li>' +
        '<li>Completadas: ' + completada + '</li>';

    // Cálculo del porcentaje para la barra
    let porcentaje = 0;
    if (misiones.length > 0) {
        porcentaje = Math.round((completada / misiones.length) * 100);
    }
    
    let barra = document.getElementById('progresoBarra');
    barra.style.width = porcentaje + "%";
    barra.innerText = porcentaje + "%";
}

// Sirve para que salga el apartado hangar desde el principio
mostrarSeccion('hangar');



