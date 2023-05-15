import config from '../supabase/keys.js';

const Controlador = {
    mostrarRegistrosTablas: function () {
        axios({
            method: 'GET',
            url: 'https://mmphzayxvvhdtrtcvjsq.supabase.co/rest/v1/datos_csv?select=*',
            headers: config.headers
        })
            .then(function (response) {

                response.data.forEach(element => {


                    console.log(element)

                });

                //Vista.mostrarRegistrosTablas(response.data);
            })
            .catch(function (error) {
                console.log(error)
                Vista.mostrarMensajeError(error);
            })
    },

    mostrarRegistrosTablas2: function () {
        axios({
            method: 'GET',
            url: 'https://mmphzayxvvhdtrtcvjsq.supabase.co/rest/v1/registros_prueba?select=*',
            headers: config.headers
        })
            .then(function (response) {
                Vista.mostrarRegistrosTablas2(response.data);
            })
            .catch(function (error) {
                console.log(error)
                Vista.mostrarMensajeError(error);
            })
    },

    mostrarRegistrosTablas3: function () {
        axios({
            method: 'GET',
            url: 'https://mmphzayxvvhdtrtcvjsq.supabase.co/rest/v1/registros_prueba?select=*',
            headers: config.headers
        })
            .then(function (response) {
                Vista.mostrarRegistrosTablas3(response.data);
            })
            .catch(function (error) {
                console.log(error)
                Vista.mostrarMensajeError(error);
            })
    },
}

const Vista = {
    /* PAGINA PRINCIPAL */
    mostrarRegistrosTablas: function (data) {
        console.log(data)
    },

    mostrarRegistrosTablas2: function (data) {
        // Paso 2: Agrupar los datos por valor de la columna


        // Paso 3: Preparar los datos para la gráfica
        const labels = Object.keys(groupedData);
        const values = Object.values(groupedData);

        // Paso 4: Configurar y renderizar la gráfica
        const canvas = document.getElementById('myChart2');
        const chart = new Chart(canvas, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Datos',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Renderiza la gráfica
        chart.render();
    },

    mostrarRegistrosTablas3: function (data) {
        // Paso 2: Agrupar los datos por valor de la columna
        const groupedData = data.reduce((accumulator, item) => {
            const columnValue = item.class; // Reemplaza 'nombre_de_columna' con el nombre real de la columna

            if (accumulator.hasOwnProperty(columnValue)) {
                accumulator[columnValue]++;
            } else {
                accumulator[columnValue] = 1;
            }

            return accumulator;
        }, {});

        // Paso 3: Preparar los datos para la gráfica
        const labels = Object.keys(groupedData);
        const values = Object.values(groupedData);

        // Paso 4: Configurar y renderizar la gráfica
        const canvas = document.getElementById('myChart3');
        const chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Datos',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Renderiza la gráfica
        chart.render();
    },

    /* MENSAJES DE ERRORES */
    mostrarMensajeError(mensaje) {
        console.log(mensaje)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    Controlador.mostrarRegistrosTablas();
    Controlador.mostrarRegistrosTablas2();
    Controlador.mostrarRegistrosTablas3();
})

