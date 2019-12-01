function editarEstudiante(id) {
    var estudiante;
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        if (clave == id) {
            estudiante = $.parseJSON(localStorage.getItem(clave));

            $("#codigo").val(estudiante.codigo);
            $("#nombre").val(estudiante.nombre);
            $("#nota").val(estudiante.nota);
        }
    }
}

function eliminarEstudiante(id) {
    localStorage.removeItem(id);
    listarEstudiante();
}

function listarEstudiante() {
    var tabla = "";
    var parrafo1 = $("#p1");

    tabla += "<table border=\'1\'>";
    tabla += "<tr>";
    tabla += "<th>CODIGO</th>";
    tabla += "<th>NOMBRE</th>";
    tabla += "<th>NOTA</th>";
    tabla += "<th>EDITAR</th>";
    tabla += "<th>ELIMINAR</th>";
    tabla += "</tr>";

    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        var estudiante = $.parseJSON(localStorage.getItem(clave));
        tabla += "<tr id='" + estudiante.codigo + "'>";
        tabla += "<td>" + estudiante.codigo + "</td>";
        tabla += "<td>" + estudiante.nombre + "</td>";
        tabla += "<td>" + estudiante.nota + "</td>";
        tabla += "<td><button class='btn-centro' onclick='editarEstudiante(\"" + estudiante.codigo + "\");'>Editar</button></td>";
        tabla += "<td><button class='btn-centro' onclick='eliminarEstudiante(\"" + estudiante.codigo + "\");'>Eliminar</button></td>";
        tabla += "</tr>";
    }

    tabla += "</table>";
    $(parrafo1).html(tabla);
}

function validarEstudiante(estudiante) {
    var mensaje = 0;

    if (estudiante.nota <= -1 || estudiante.nota > 1000 || estudiante.nota == '') {
        mensaje = 1;
    }

    return mensaje;
}
$(document).ready(function() {
    var codigoE;
    if (localStorage.length > 0) {
        codigoE = localStorage.length + 1;
    } else {
        codigoE = 1;
    }
    $("#codigo").val(codigoE);
    $("#nombre").keypress(function(key) {
        if ((key.charCode < 97 || key.charCode > 122) //letras mayusculas
            &&
            (key.charCode < 65 || key.charCode > 90) //letras minusculas
            &&
            (key.charCode != 45) //retroceso
            &&
            (key.charCode != 241) //ñ
            &&
            (key.charCode != 209) //Ñ
            &&
            (key.charCode != 32) //espacio
            &&
            (key.charCode != 225) //á
            &&
            (key.charCode != 233) //é
            &&
            (key.charCode != 237) //í
            &&
            (key.charCode != 243) //ó
            &&
            (key.charCode != 250) //ú
            &&
            (key.charCode != 193) //Á
            &&
            (key.charCode != 201) //É
            &&
            (key.charCode != 205) //Í
            &&
            (key.charCode != 211) //Ó
            &&
            (key.charCode != 218) //Ú

        )
            return false;
    });
    $("#btn-registrar").click(function() {
        var codigo = $("#codigo").val();
        var nombre = $("#nombre").val();
        var nota = $("#nota").val();

        var estudiante = {
            codigo: codigo,
            nombre: nombre,
            nota: nota
        };
        validacion = validarEstudiante(estudiante);
        if (!validacion) {
            localStorage.setItem(codigo, JSON.stringify(estudiante));
            codigoE = localStorage.length + 1;
            listarEstudiante();
            restablecer();
        } else {
            alert('Nota invalida');
        }
    });

    function restablecer() {
        $("#codigo").val(codigoE + 1);
        $("#nombre").val("");
        $("#nota").val("");
    }

    function promedio() {
        var parrafo1 = $("#p1");
        var promedio = 0;

        for (var i = 0; i < localStorage.length; i++) {
            var clave = localStorage.key(i);
            var estudiante = $.parseJSON(localStorage.getItem(clave));

            promedio += parseInt(estudiante.nota);
        }
        calculo_promedio = promedio / localStorage.length;
        alert("El promedio es " + calculo_promedio.toFixed(2));
        listarEstudiante();
    }

    function mayor() {
        var mayor = 0;

        for (var i = 0; i < localStorage.length; i++) {
            var clave = localStorage.key(i);
            var estudiante = $.parseJSON(localStorage.getItem(clave));
            if (parseInt(estudiante.nota) > mayor) {
                codigo = estudiante.codigo;
                nombre = estudiante.nombre
                mayor = parseInt(estudiante.nota);
            }
        }
        listarEstudiante();
        alert("La nota mayor es : " + mayor + ' \nCodigo: ' + codigo + '\nNombre: ' + nombre);
    }

    function menor() {
        var menor = 1000;

        for (var i = 0; i < localStorage.length; i++) {
            var clave = localStorage.key(i);
            var estudiante = $.parseJSON(localStorage.getItem(clave));
            if (parseInt(estudiante.nota) < menor) {
                codigo = estudiante.codigo;
                nombre = estudiante.nombre
                menor = parseInt(estudiante.nota);
            }
        }
        listarEstudiante();
        alert("La nota menor es : " + menor + ' \nCodigo: ' + codigo + '\nNombre: ' + nombre);
    }


    $("#btn-promedio").click(function() {
        listarEstudiante();
        promedio();
    });
    $("#btn-mayor").click(function() {
        listarEstudiante();
        mayor();
    });
    $("#btn-menor").click(function() {
        listarEstudiante();
        menor();
    });


});