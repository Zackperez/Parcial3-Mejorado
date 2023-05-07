const edad = document.getElementById('edad');
const menopausia = document.getElementById('menopausia');
const tumorTamaño = document.getElementById('tumorTamaño');
const invNodes = document.getElementById('invNodes');
const nodesCaps = document.getElementById('nodesCaps');
const gradoTumor = document.getElementById('gradoTumor');
const breast = document.getElementById('breast');
const breastQuead = document.getElementById('breastQuead');
const irradiat = document.getElementById('irradiat');

const enviarDatos = document.getElementById('enviarDatos')

enviarDatos.onclick = function(){
  const datos_insertar = {
    edad : edad.value,
    menopausia : menopausia.value,
    tumorTamaño : tumorTamaño.value,
    invNodes : invNodes.value,
    nodesCaps : nodesCaps.value,
    gradoTumor : gradoTumor.value,
    breast : breast.value,
    breastQuead : breastQuead.value,
    irradiat : irradiat.value
  }

  console.log(datos_insertar);
}

/*
function insertar_datos_paciente(){
  axios({
    method: "POST",
    url: "http://127.0.0.1:4000/insertar_datos_paciente/",
    data: datos_insertar,
  })
  .then(res =>
    console.log(res))
  .catch(err => console.log('Error:', err))
}
*/
