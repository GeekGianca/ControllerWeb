$(document).ready(function () {
    cargarRegistros();

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