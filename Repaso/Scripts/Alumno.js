$("#dtFechaNacimiento").datepicker({
  dateFormat: "dd/mm/yy",
  changeMonth: true,
  changeYear: true,
});

listar();
function listar() {
  $.get("Alumno/listarAlumnos", function (data) {
    crearListado(
      [
        "Id",
        "Nombre",
        "Apellido Paterno",
        "Apellido Materno",
        "Telefono Padre",
      ],
      data
    );
  });
}

$.get("Alumno/listarSexo", function (data) {
  llenarCombo(data, document.getElementById("cboSexoPopup"), true);
});

var btnBuscar = document.getElementById("btnBuscar");
btnBuscar.onclick = function () {
  var iidsexo = document.getElementById("cboSexo").value;
  if (iidsexo == "") {
    listar();
  } else {
    $.get("Alumno/filtrarAlumnoPorSexo/?iidsexo=" + iidsexo, function (data) {
      crearListado(
        [
          "Id",
          "Nombre",
          "Apellido Paterno",
          "Apellido Materno",
          "Telefono Padre",
        ],
        data
      );
    });
  }
};

var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
  //document.getElementById("cboSexo").value=''; // La intencion era que muestre otra vez la primer opcion.
  listar();
};

function llenarCombo(data, control, primerElemento) {
  var contenido = "";
  if (primerElemento == true) {
    contenido += "<option value=''>--Seleccione--</option>"; // Agrego una linea como primera opcion y value = vacío.
  }

  for (var i = 0; i < data.length; i++) {
    contenido += "<option value='" + data[i].IID + " ' >";
    contenido += data[i].NOMBRE;
    contenido += "</option>";
  }
  control.innerHTML = contenido;
}

function crearListado(arrayColumnas, data) {
  var contenido = "";
  contenido += "<table id='tablas'  class='table' >";
  contenido += "<thead>";
  contenido += "<tr>";
  for (var i = 0; i < arrayColumnas.length; i++) {
    contenido += "<td>";
    contenido += arrayColumnas[i];
    contenido += "</td>";
  }
  contenido += "<td>Operaciones</td>";
  contenido += "</tr>";
  contenido += "</thead>";
  var llaves = Object.keys(data[0]);
  contenido += "<tbody>";
  for (var i = 0; i < data.length; i++) {
    contenido += "<tr>";
    for (var j = 0; j < llaves.length; j++) {
      var valorLLaves = llaves[j];
      contenido += "<td>";
      contenido += data[i][valorLLaves];
      contenido += "</td>";
    }
    var llaveId = llaves[0];
    contenido += "<td>";
    contenido +=
      "<button class='btn btn-primary' onclick='abrirModal(" +
      data[i][llaveId] +
      ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> ";
    contenido +=
      "<button class='btn btn-danger' onclick='eliminar(" +
      data[i][llaveId] +
      ")' ><i class='glyphicon glyphicon-trash'></i></button>";
    contenido += "</td>";

    contenido += "</tr>";
  }
  contenido += "</tbody>";
  contenido += "</table>";
  document.getElementById("tabla").innerHTML = contenido;
  $("#tablas").dataTable({
    searching: false,
  });
}
