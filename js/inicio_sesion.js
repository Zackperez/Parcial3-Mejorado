const Modelo = {
  async iniciarSesion(username, password) {
    const datos_insertar = {
      username: username,
      password: password
    }
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:5000/login",
      data: datos_insertar
    });
    return res;
  }
}

const Vista = {
  getDatosIniciarSesion() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    return { username, password };
  },

  mostrarMensajeError(mensaje) {
    alert(mensaje)
    console.log(mensaje);
  },

  mostrarMensajeSatisfactorio(mensaje) {
    alert(mensaje)
    console.log(mensaje);
  },

  redirigirAIndex() {
    location.href = ("../index.html");
  }
}

const Controlador = {
  async iniciarSesion() {
    const { username, password } = Vista.getDatosIniciarSesion();
    try {
      const res = await Modelo.iniciarSesion(username, password);
      console.log(res)
      if (res.status == "200") {
        const access_token = res.data.access_token;
        localStorage.setItem("access_token", access_token);
        Vista.mostrarMensajeSatisfactorio("Inicio de sesión exitoso");
        Vista.redirigirAIndex();
      }
    } catch (err) {
      Vista.mostrarMensajeError('Error al iniciar sesión');
    }
  }
}


const botonIniciarSesion = document.getElementById('botonIniciarSesion');

botonIniciarSesion.onclick = function(){
  Controlador.iniciarSesion()
}