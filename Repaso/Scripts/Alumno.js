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
  llenarCombo(data, document.getElementById("cboSexo"), true);
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
