import config from '../supabase/keys.js';

const Controlador = {
    mostrarRegistrosTablas: function () {
        axios({
            method: 'GET',
            url: 'https://mmphzayxvvhdtrtcvjsq.supabase.co/rest/v1/datos_csv?select=*',
            headers: config.headers
        })
            .then(function (response) {
                // Objeto para almacenar el conteo de repeticiones
                const ageCount = {};

                // Iterar sobre los datos y contar las repeticiones
                response.data.forEach(obj => {
                    const age = obj.age;
                    if (ageCount.hasOwnProperty(age)) {
                        ageCount[age]++;
                    } else {
                        ageCount[age] = 1;
                    }
                });


                Vista.mostrarRegistrosTablas(ageCount);
            })
            .catch(function (error) {
                console.log(error)
                Vista.mostrarMensajeError(error);
            })
    },

    mostrarRegistrosTablas2: function () {
        axios({
            method: 'GET',
            url: 'https://mmphzayxvvhdtrtcvjsq.supabase.co/rest/v1/datos_csv?select=*',
            headers: config.headers
        })
            .then(function (response) {
                // Objeto para almacenar el conteo de repeticiones
                const irradiatCount = {};

                // Iterar sobre los datos y contar las repeticiones
                response.data.forEach(obj => {
                    const irradiat = obj.irradiat;
                    if (irradiatCount.hasOwnProperty(irradiat)) {
                        irradiatCount[irradiat]++;
                    } else {
                        irradiatCount[irradiat] = 1;
                    }
                });


                Vista.mostrarRegistrosTablas2(irradiatCount);
            })
            .catch(function (error) {
                console.log(error)
                Vista.mostrarMensajeError(error);
            })
    },

    mostrarRegistrosTablas3: function () {
        axios({
            method: 'GET',
            url: 'https://mmphzayxvvhdtrtcvjsq.supabase.co/rest/v1/datos_csv?select=*',
            headers: config.headers
        })
            .then(function (response) {
                // Objeto para almacenar el conteo de repeticiones
                const menopauseCount = {};

                // Iterar sobre los datos y contar las repeticiones
                response.data.forEach(obj => {
                    const menopause = obj.menopause;
                    if (menopauseCount.hasOwnProperty(menopause)) {
                        menopauseCount[menopause]++;
                    } else {
                        menopauseCount[menopause] = 1;
                    }
                });


                Vista.mostrarRegistrosTablas3(menopauseCount);
            })
            .catch(function (error) {
                console.log(error)
                Vista.mostrarMensajeError(error);
            })
    },

    mostrarRegistrosTablas4: function () {
        axios({
            method: 'GET',
            url: 'https://mmphzayxvvhdtrtcvjsq.supabase.co/rest/v1/datos_csv?select=*',
            headers: config.headers
        })
            .then(function (response) {
                // Preparar los datos para Chart.js
                const labels = response.data.map(item => `${item.tumor_size} - ${item.inv_nodes}`);
                const dataX = response.data.map(item => {
                    const tumorSize = item.tumor_size.split('-');
                    return (parseInt(tumorSize[0]) + parseInt(tumorSize[1])) / 2;
                });
                const dataY = response.data.map(item => {
                    const invNodes = item.inv_nodes.split('-');
                    return (parseInt(invNodes[0]) + parseInt(invNodes[1])) / 2;
                });
                Vista.mostrarRegistrosTablas4(labels, dataX, dataY);
            })
            .catch(function (error) {
                console.log(error)
            })
    },
}

const Vista = {
    /* PAGINA PRINCIPAL */
    mostrarRegistrosTablas: function (data) {
        const labels = Object.keys(data);
        const values = Object.values(data);

        // Paso 4: Configurar y renderizar la gráfica
        const canvas = document.getElementById('myChart');
        const chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Rango de edades',
                    data: values,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(99, 255, 138)',
                        'rgb(235, 163, 54)',
                        'rgb(231, 76, 252)'

                    ],
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

    mostrarRegistrosTablas2: function (data) {
        const labels = Object.keys(data);
        const values = Object.values(data);

        // Paso 4: Configurar y renderizar la gráfica
        const canvas = document.getElementById('myChart2');
        const chart = new Chart(canvas, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Datos',
                    data: values,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(99, 255, 138)',
                        'rgb(235, 163, 54)',
                        'rgb(231, 76, 252)'

                    ],
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
        const labels = Object.keys(data);
        const values = Object.values(data);

        // Paso 4: Configurar y renderizar la gráfica
        const canvas = document.getElementById('myChart3');
        const chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Datos',
                    responsive: true,
                    data: values,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(99, 255, 138)',
                        'rgb(235, 163, 54)',
                        'rgb(231, 76, 252)'

                    ],
                },

                ]
            },

            options: {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Periodo de tiempo'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Frecuencia'
                        }
                    }
                }
            }
        });

        // Renderiza la gráfica
        chart.render();
    },

    mostrarRegistrosTablas4: function (labels, dataX, dataY) {

        // Paso 4: Configurar y renderizar la gráfica
        const ctx = document.getElementById('myChart4');
        const chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Relación Tamaño del Tumor vs Número de Ganglios Linfáticos',
                    data: dataX.map((value, index) => ({ x: value, y: dataY[index] })),
                    backgroundColor: 'rgb(255, 99, 132)', // Color del punto
                    borderColor: 'rgb(99, 255, 138)', // Color del borde
                    borderWidth: 2,
                    pointRadius: 6
                  }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        text: 'Tamaño del Tumor', // Etiqueta descriptiva para el eje X
                        display: true
                    },
                    y: {
                        type: 'linear',
                        position: 'left',
                        text: 'Número de Ganglios Linfáticos', // Etiqueta descriptiva para el eje Y
                        display: true
                    }
                }
            }
        });

        // Renderiza la gráfica
        chart.render();
    },


}

document.addEventListener('DOMContentLoaded', function () {
    Controlador.mostrarRegistrosTablas();
    Controlador.mostrarRegistrosTablas2();
    Controlador.mostrarRegistrosTablas3();
    Controlador.mostrarRegistrosTablas4();

})