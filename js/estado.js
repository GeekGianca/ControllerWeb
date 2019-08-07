$(document).ready(function () {
    cargarEstado();

    $(document).on('click', '#closesession', function () {
        firebase.auth().signOut().then(function () {
            window.location.href = 'index.html';
        }).catch(function (error) {
            alert(error);
        });
    });

    function cargarEstado() {
        $.ajax({
            url: 'php/listarestadoenergia.php',
            type: 'GET',
            success: function (response) {
                let datos = JSON.parse(response);
                console.log(datos);
                let template = '';
                datos.forEach(dato => {
                    template += `
                    <tr correousuario="${dato.correo}">
                        <td>
                            ${dato.nombre}
                        </td>
                        <td>${dato.fechadelevento}</td>
                        <td>${dato.horadelevento}</td>
                        <td>${dato.tipodelevento}</td>
                        <td>${dato.correo}</td>
                        <td>
                            <button class="dato-eliminar btn btn-danger btn-sm">
                                ELIMINAR
                            </button>
                        </td>
                    </tr>`;
                });
                $('#datosenergia').html(template);
            }
        });
    }
});