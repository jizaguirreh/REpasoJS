$("#dtFechaContrato").datepicker({
  dateFormat: "dd/mm/yy",
  changeMonth: true,
  changeYear: true,
});

listar();
listarComboModalidad();

$.get("Alumno/listarSexo", function (data) {
  llenarCombo(data, document.getElementById("cboSexoPopup"), true);
});

function listarComboModalidad() {
  $.get("Docente/listarModalidadContrato", function (data) {
    llenarCombo(data, document.getElementById("cboTipoModalidad"), true);
    llenarCombo(
      data,
      document.getElementById("cboModalidadContratoPopup"),
      true
    );
  });
}

var cboTipoModalidad = document.getElementById("cboTipoModalidad");
cboTipoModalidad.onchange = function () {
  var itemSeleccionado = document.getElementById("cboTipoModalidad").value;
  if (itemSeleccionado == "") {
    listar();
  } else {
    $.get(
      "Docente/filtrarDocentePorModalidad/?iimodalidad=" + itemSeleccionado,
      function (data) {
        crearListado(
          [
            "Id Docente",
            "Nombre",
            "Apellido Paterno",
            "Apellido Materno",
            "Email",
          ],
          data
        );
      }
    );
  }
};

function listar() {
  $.get("Docente/listarDocente", function (data) {
    crearListado(
      ["Id Docente", "Nombre", "Apellido Paterno", "Apellido Materno", "Email"],
      data
    );
  });
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
