import config from '../supabase/keys.js';


//Modelo que recibe los datos y los envia a la base de datos
const Modelo = {
  //función asíncrona que recibe la data a enviar
  async enviarTicket( nombre, apellido, correo, titulo, descripcion ) {
    //se guarda en un objeto para luego ser enviado como data en AXIOS
    const datos_insertar = {
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      titulo: titulo,
      descripcion: descripcion
    }

    //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
    const res = axios({
      method: "POST",
      url: "https://mmphzayxvvhdtrtcvjsq.supabase.co/rest/v1/tickets",
      headers: config.headers,
      data: datos_insertar,
    });
    return res
  }
}

const Vista = {
  //Método de la vista que recibe los valores que hay en el DOM y los retorna
  getDatosTicket() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    return { nombre, apellido, correo, titulo, descripcion };
  },

  //Método para mostrar los mensajes de errores
  mostrarMensajeError(mensaje) {
    alert(mensaje)
  },

  mostrarAlertaSatisfactorio(mensaje){
    alert(mensaje)
  },

}

const Controlador = {
  async enviarTicket() {
    const { nombre, apellido, correo, titulo, descripcion } = Vista.getDatosTicket();

    try {
      //Se envian los datos al modelo y se espera hasta que se ejecute (el modelo) y retorne un resultado
      const res = await Modelo.enviarTicket(nombre, apellido, correo ,titulo, descripcion);
      //dentro de "res" se almacena el resultado de AXIOS.
      //Si el status en correcto, se muestra un alert
      if (res.status == "201") {
        Vista.mostrarAlertaSatisfactorio("Ticket enviado")
      }
      //Caso contrario, mostrará un mensaje de error que se envia a la vista para mostrarla
    } catch (err) {
      Vista.mostrarMensajeError('Error al enviar ticket');
    }
  }
}

const botonEnviar = document.getElementById('botonEnviar');

botonEnviar.onclick = function(){
  Controlador.enviarTicket();
}

if (localStorage.getItem("access_token")) {

  const ul2 = document.getElementById("menuLista");
  const li2 = document.createElement('li');
  const button2 = document.createElement('button');
  const a2 = document.createElement('a');
  li2.classList.add('menu__item');
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

  const cerrarSesion = document.getElementById("cerrarSesion");

  cerrarSesion.onclick = function () {
    localStorage.removeItem('access_token');
    alert("Has cerrado sesión");
    location.href = "../../index.html";
  }

  const vistaTickets = document.getElementById('tickets');

  vistaTickets.onclick = function () {
    location.href = "admin/tickets.html";
  }
} else {
  const ul = document.getElementById("menuLista");
  const li = document.createElement('li');
  const button = document.createElement('button');
  const a = document.createElement('a');
  li.classList.add('menu__item');
  button.setAttribute("id", "IniciarSesion")
  a.setAttribute("href", "inicio_sesion.html");
  button.appendChild(a)
  li.appendChild(button)
  a.appendChild(document.createTextNode("Iniciar Sesión"));
  ul.appendChild(li);
}


