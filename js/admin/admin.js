import config from '../supabase/keys.js';

const Controlador = {
  pageNumber: 1, // Página actual
  pageSize: 10, // Cantidad de elementos por página

  obtenerTickets: function() {
    const url = `https://mmphzayxvvhdtrtcvjsq.supabase.co/rest/v1/tickets?select=*&limit=${Controlador.pageSize}&offset=${(Controlador.pageNumber - 1) * Controlador.pageSize}`;
    
    axios({
      method: 'GET',
      url: url,
      headers: config.headers,
    })
      .then(function(response) {
        Vista.mostrarTickets(response.data);
        const totalPages = Math.ceil(response.headers['x-total-count'] / Controlador.pageSize);
        Vista.actualizarPaginacion(totalPages);
      })
      .catch(function(error) {
        console.log(error);
        Vista.mostrarMensajeError(error);
      });
  },

  irAPagina: function(page) {
    Controlador.pageNumber = page;
    Controlador.obtenerTickets();
  },

  irAPaginaAnterior: function() {
    if (Controlador.pageNumber > 1) {
      Controlador.irAPagina(Controlador.pageNumber - 1);
    }
  },

  irAPaginaSiguiente: function() {
    Controlador.irAPagina(Controlador.pageNumber + 1);
  },
};

const Vista = {
  mostrarTickets: function(datos) {
    const tablaTickets = document.getElementById('tablaTickets');
    tablaTickets.innerHTML = ''; // Limpiar contenido existente

    datos.forEach(dato => {
      const fila = document.createElement('tr');
      for (const prop in dato) {
        const celda = document.createElement('td');
        celda.textContent = dato[prop];
        fila.appendChild(celda);
      }
      tablaTickets.appendChild(fila);
    });
  },

  mostrarMensajeError: function(mensaje) {
    alert(mensaje);
  },

  actualizarPaginacion: function(totalPages) {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = ''; // Limpiar paginación existente


    const previousButton = document.createElement('button');
    previousButton.classList.add('pagination-button');
    previousButton.textContent = 'Anterior';
    previousButton.addEventListener('click', function(event) {
      event.preventDefault();
      Controlador.irAPaginaAnterior();
    });

    // Enlaces de páginas
    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement('button');
      pageLink.href = '#';
      pageLink.textContent = i;
      pageLink.addEventListener('click', function(event) {
        event.preventDefault();
        Controlador.irAPagina(i);
      });

      if (i === Controlador.pageNumber) {
        pageLink.classList.add('active');
      }

      const listItem = document.createElement('li');
      listItem.appendChild(pageLink);

      paginationContainer.appendChild(listItem);
    }

   const nextButton = document.createElement('button');
nextButton.classList.add('pagination-button');
nextButton.textContent = 'Siguiente';
nextButton.addEventListener('click', function(event) {
  event.preventDefault();
  Controlador.irAPaginaSiguiente();
});
    
paginationContainer.appendChild(previousButton);
paginationContainer.appendChild(nextButton);
  },
};

document.addEventListener('DOMContentLoaded', function() {
  Controlador.obtenerTickets();
});

if(localStorage.getItem("access_token")){

    const ul2 = document.getElementById("menuLista");
    const li2 = document.createElement('li');
    const button2 = document.createElement('button');
    const a2 = document.createElement('a');
    li2.classList.add('menu__item', 'menu__item--active');
    button2.setAttribute("id", "tickets")
    button2.appendChild(a2)
    li2.appendChild(button2)
    a2.appendChild(document.createTextNode("Tickets"));
    ul2.appendChild(li2);

    const ul = document.getElementById("menuLista");
    const li = document.createElement('li');
    const button = document.createElement('button');
    const a = document.createElement('a');
    li.classList.add('menu__item');
    button.setAttribute("id", "cerrarSesion")
    button.appendChild(a)
    li.appendChild(button)
    a.appendChild(document.createTextNode("Cerrar sesión"));
    ul.appendChild(li);

}else{
    const ul = document.getElementById("menuLista");
    const li = document.createElement('li');
    const button = document.createElement('button');
    const a = document.createElement('a');
    li.classList.add('menu__item');
    button.setAttribute("id", "IniciarSesion")
    a.setAttribute("href", "pages/inicio_sesion.html");
    button.appendChild(a)
    li.appendChild(button)
    a.appendChild(document.createTextNode("Iniciar Sesión"));
    ul.appendChild(li);
}


const cerrarSesion = document.getElementById ("cerrarSesion");

cerrarSesion.onclick = function (){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cerrar sesión',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('access_token');
          //alert("Has cerrado sesión");
          location.href = "../../index.html";
        }
      })
}

// Obtiene una referencia al elemento de la tabla
const tablaTickets = document.getElementById('tablaTickets');

// Define los encabezados de la tabla
const encabezados = ['Título', 'Hora', 'Descripción', 'Usuario'];

// Define los datos de ejemplo
const datos = [
  {
    titulo: 'Problema con...',
    hora: '12:50am',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quo voluptatum labore asperiores, sed suscipit tempore totam iusto iste nulla!',
    usuario: 'Jean Trujillo'
  },
  // Agrega más objetos de datos aquí
];

// Crea la fila de encabezado
const encabezadoRow = document.createElement('tr');
encabezados.forEach(encabezado => {
  const th = document.createElement('th');
  th.textContent = encabezado;
  encabezadoRow.appendChild(th);
});
tablaTickets.appendChild(encabezadoRow);

// Agrega los datos a la tabla
datos.forEach(dato => {
  const fila = document.createElement('tr');
  for (const prop in dato) {
    const celda = document.createElement('td');
    celda.textContent = dato[prop];
    fila.appendChild(celda);
  }
  tablaTickets.appendChild(fila);
});

