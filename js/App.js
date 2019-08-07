$(document).ready(function () {
    //Variable para actualizar los datos
    let isEdita = false;
    let currentUser;
    let idelectrodomesticoAct;
    //Lista los electrodomesticos registrados
    obtenerElectrodomesticos();

    cargarusuario();

    $('#search').keyup(function (e) {
        if ($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'php/electrodomesticobuscar.php',
                type: 'POST',
                data: {search},
                success: function (response) {
                    let datos = JSON.parse(response);
                    let template = '';
                    datos.forEach(dato => {
                        template += `<li>${dato.nombre}</li>`
                    });
                    $('#container').html(template);
                    $('#resultado').show();
                }
            });
        } else {
            $('#resultado').hide();
        }
    });

    $(document).on('click', '#closesession', function () {
        firebase.auth().signOut().then(function () {
            window.location.href = 'index.html';
        }).catch(function (error) {
            alert(error);
        });
    });

    $('#lote-elect').submit(function (e) {
        let posDatos = {
            nombre: $('#nombreelec').val(),
            ubicacion: $('#ubicacionelec').val(),
            estado: $("input[name='opcion']:checked").val(),
            idusuario: currentUser.uid
        };
        if (isEdita) {
            posDatos = {
                idelectrodomestico: idelectrodomesticoAct,
                nombre: $('#nombreelec').val(),
                ubicacion: $('#ubicacionelec').val(),
                estado: $("input[name='opcion']:checked").val(),
            };
        }
        console.log(posDatos);
        let url = isEdita == false ? 'php/insertarelectrodomestico.php' : 'php/actualizarelectrodomestico.php';
        console.log(url);
        $.post(url, posDatos, function (response) {
            console.log(response);
            obtenerElectrodomesticos();
            $('#lote-elect').trigger('reset');
            isEdita = false;
        });
        e.preventDefault();
    });

    $(document).on('click', '.dato-actualizar', function () {
        let element = $(this)[0].parentElement.parentElement;
        let codigo = $(element).attr('idelectrodomestico');
        $.post('php/seleccionarelectrodomestico.php', {codigo}, function (response) {
            const dato = JSON.parse(response);
            if (dato.estado == "1") {
                actualizar(dato, 0);
                //encender(dato);
            } else {
                actualizar(dato, 1);
                //apagar(dato);
            }
        });
    });

    $(document).on('click', '.dato-eliminar', function () {
        if (confirm('Estas seguro de eliminar el electrodomestico?')) {
            let element = $(this)[0].parentElement.parentElement;
            let datoid = $(element).attr('idelectrodomestico');
            $.post('php/eliminarelectrodomestico.php', {datoid}, function (response) {
                obtenerElectrodomesticos();
            });
        }
    });

    $(document).on('click', '.dato-nombre', function () {
        let element = $(this)[0].parentElement.parentElement;
        let codigo = $(element).attr('idelectrodomestico');
        idelectrodomesticoAct = codigo;
        $.post('php/seleccionarelectrodomestico.php', {codigo}, function (response) {
            const dato = JSON.parse(response);
            $('#nombreelec').val(dato.nombre);
            $('#ubicacionelec').val(dato.ubicacion);
            var radios = $('input:radio[name=opcion]');
            if (dato.estado == "1") {
                radios.filter('[value=1]').prop('checked', true);
            } else {
                radios.filter('[value=0]').prop('checked', true);
            }
            isEdita = true;
        });

    });

    //FUNCTIONS
    function obtenerElectrodomesticos() {
        $("#cargando").css("display","block");
        $.ajax({
            url: 'php/listarelectrodomesticos.php',
            type: 'GET',
            success: function (response) {
                console.log(response);
                let datos = JSON.parse(response);
                console.log(datos);
                let template = '';
                let estado = "";
                let actualEstado = "";
                datos.forEach(dato => {
                    estado = dato.estado == "1" ? "ENCENDER" : "APAGAR";
                    actualEstado = dato.estado == "1" ? "Apagado" : "Encendido";
                    template += `
                    <tr idelectrodomestico="${dato.idelectrodomestico}">
                        <td>
                            ${dato.nombre}
                        </td>
                        <td>${dato.ubicacion}</td>
                        <td>${actualEstado}</td>
                        <td>
                            <button class="dato-actualizar text-white btn btn-warning btn-sm">
                                ${estado}
                            </button>
                        </td>
                        <td>
                            <button class="dato-nombre text-white btn btn-warning btn-sm">
                                EDITAR
                            </button>
                            <button class="dato-eliminar btn btn-danger btn-sm">
                                ELIMINAR
                            </button>
                        </td>
                    </tr>`;
                });
                $('#datoselectrodomesticos').html(template);
                $('#cargando').css("display","none");
            }
        })
    }

    function encender(data) {
        let encenderElec = data.nombre + "on";
        $.ajax({
            url: '192.' + encenderElec,
            type: 'GET',
            success: function (response) {
                actualizar(data, "0");
            }
        });
    }

    function apagar(nombre) {
        let encenderElec = nombre + "off";
        $.ajax({
            url: '192.' + encenderElec,
            type: 'GET',
            success: function (response) {
                actualizar(data, "1");
            }
        });
    }

    function actualizar(data, estado) {
        const posDatos = {
            nombre: data.nombre,
            ubicacion: data.ubicacion,
            estado: estado,
            idelectrodomestico: data.idelectrodomestico
        };
        console.log("Update Data");
        console.log(posDatos);
        $.post('php/actualizarelectrodomestico.php', posDatos, function (response) {
            console.log(response);
            obtenerElectrodomesticos();
        });
    }

    //Check if status is ok or not signed
    function cargarusuario() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                currentUser = user;
                hometitle.innerHTML = (currentUser.displayName == null) ? currentUser.email : currentUser.displayName;
                console.log(currentUser);
            } else {
                window.location.href = "index.html";
            }
        });
    }
});