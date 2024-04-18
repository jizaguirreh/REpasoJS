listar();
listarComboModalidad();

function listarComboModalidad() {
  $.get("Docente/listarModalidadContrato", function (data) {
    llenarCombo(data, document.getElementById("cboTipoModalidad"), true);
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
  contenido += `
      <table id='tablas' class='table'>
      <thead>
      <tr>`;
  for (var i = 0; i < arrayColumnas.length; i++)
    contenido += `<td>${arrayColumnas[i]}</td>`;
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
