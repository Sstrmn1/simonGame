// Variables
let juegoComenzado = false;
let numeroRandom = 0;
const patron = [];
const patron2 = [];
const colores = ["green", "red", "yellow", "blue"];

$(document).on("keydown", function () {
  if (juegoComenzado === false) {
    console.log("El juego a empezado");
    comenzarJuego();
    juegoComenzado = true;  
  }
});

colores.forEach((color) => {
  $("#" + color).on("click", function () {
    if (juegoComenzado === true) {
      patron.push(color);

      animacionBoton(color);

      console.log(patron);
    }
  });
});

// Funciones
function comenzarJuego() {
  let color = "";
  numeroRandom = Math.floor(Math.random() * 4);
  switch (numeroRandom) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "red";
      break;
    case 2:
      color = "yellow";
      break;
    case 3:
      color = "blue";
      break;

    default:
      break;
  }
  animacionBoton(color);
}

function animacionBoton(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}
