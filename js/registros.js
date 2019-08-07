$(document).ready(function () {
    cargarRegistros();

    $(document).on('click', '#closesession', function () {
        firebase.auth().signOut().then(function () {
            window.location.href = 'index.html';
        }).catch(function (error) {
            alert(error);
        });
    });

    function cargarRegistros() {
        $.ajax({
            url: 'php/listarregistros.php',
            type: 'GET',
            success: function (response) {
                let datos = JSON.parse(response);
                console.log(datos);
                let template = '';
                datos.forEach(dato => {
                    template += `
                    <tr correousuario="${dato.correo}">
                        <td>
                            ${dato.correo}
                        </td>
                        <td>${dato.horadeentrada}</td>
                        <td>${dato.fechadeentrada}</td>
                        <td>
                            <button class="dato-eliminar btn btn-danger btn-sm">
                                ELIMINAR
                            </button>
                        </td>
                    </tr>`;
                });
                $('#datosregistros').html(template);
            }
        });
    }
});