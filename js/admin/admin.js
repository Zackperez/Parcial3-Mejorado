import config from '../supabase/keys.js';
//No se crea un modelo ya que no se está realizando operaciones complejas como el insertar datos a una BD

//Primeramente el controlador se encarga de realizar la peticion de los tickets a la BD
const Controlador = {
    //funcion para realizar la petición
    obtenerTickets: function(){
        axios({
            method: 'GET',
            url: 'https://mmphzayxvvhdtrtcvjsq.supabase.co/rest/v1/tickets?select=*',
            headers: config.headers,
        })
        //Una vez los reciba, los envia a la función mostrarTickets() de la vista
        .then(function(response){
            Vista.mostrarTickets(response.data);
        })
        //Si hay un error, guarda el mensaje y los envia a la vista para mostrar el error
        .catch(function(error){
            console.log(error)
            Vista.mostrarMensajeError(error);
        })
    }

}

/* La vista recibe los datos del controlador del resultado de la peticion 
        .then(function(response){
            Vista.mostrartickets(response.data);
        })
*/
const Vista = {
    mostrarTickets: function(datos){
        const ticketsGrilla = document.getElementById('ticketsGrilla');
        datos.forEach(datos => {
            const ticket = document.createElement('div');
            ticket.classList.add('ticket')

            ticket.innerHTML = `
                <div class="ticket-titulo">
                    <h2 class="ticket__titulo">${datos.titulo}</h2>
                </div>
                <div class="ticket-hora">
                    <p class="ticket__hora">${datos.created_at}</p>
                </div>
                <div class="ticket-descripcion">
                    <p class="ticket__descripcion">${datos.descripcion}</p>
                </div>
                <div class="ticket-usuario">
                    <p class="ticket__usuario">${datos.nombre}</p>
                </div>
            `;
            ticketsGrilla.appendChild(ticket);
        });
    },

    mostrarMensajeError(mensaje){
        alert(mensaje);
    }
}

// Una vez la página cargue, se ejecuta el controlador y la vista muestra los resultados

document.addEventListener('DOMContentLoaded', function () {
    Controlador.obtenerTickets();
})

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
