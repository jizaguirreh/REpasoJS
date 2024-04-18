$.get("Curso/listarCurso", function (data) {
  //alert(data);
  crearListado(["Id Curso", "Nombre", "Descripcion"], data);
});

var btnBuscar = document.getElementById("btnBuscar");
btnBuscar.onclick = function () {
  var nombre = document.getElementById("txtnombre").value;
  $.get("Curso/buscarCursoPorNombre/?nombre=" + nombre, function (data) {
    crearListado(data);
  });
};

var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
  $.get("Curso/listarCurso", function (data) {
    crearListado(data);
  });
  document.getElementById("txtnombre").value = "";
};

//https://www.udemy.com/course/c-aspnet-mvc-ajax-json-boostrap-javascript/learn/lecture/15460282#questions/9753558

function crearListado(arrayColumnas, data) {
  var contenido = "";
  contenido += `
    <table id='tablas' class='table'>
    <thead>
    <tr>`;
  for (var i = 0; i < arrayColumnas.length; i++)
    contenido += `<td>${arrayColumnas[i]}</td>`;
  //Columna para iconos
  contenido += "<td>Acciones</td>";
  contenido += `
    </tr>
    </thead>
    <tbody>`;
  var llaves = Object.keys(data[0]);
  for (var i = 0; i < data.length; i++) {
    contenido += `<tr>`;
    for (var j = 0; j < llaves.length; j++) {
      var valorLlaves = llaves[j];
      contenido += `<td>${data[i][valorLlaves]}</td>`;
    }
    var llaveId = llaves[0];
    //los iconos
    contenido += "<td>";
    contenido +=
      "<button class='btn btn-primary' onclick='abrirModal(" +
      data[i][llaveId] +
      ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> ";
    contenido +=
      "<button class='btn btn-danger' ><i class='glyphicon glyphicon-trash'></i></button> ";
    contenido += "</td>";
    contenido += "</tr>";
  }
  contenido += ` 
    </tbody>
    </table>`;
  document.getElementById("tabla").innerHTML = contenido;
  $("#tablas").dataTable({
    searching: false,
  });
}

function abrirModal(id) {
  if (id == 0) {
    alert("Desde Agregar");
  } else {
    alert("Desde Editar");
    $.get("Curso/recuperarDatos/?id=" + id),
      function (data) {
        document.getElementById("txtIdCurso").value = data[0].IIDCURSO;
        document.getElementById("txtNombre").value = data[0].NOMBRE;
        document.getElementById("txtDescripcion").value = data[0].DESCRIPCION;
      };
  }
}
