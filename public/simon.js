// Variables
let juegoComenzado = false;
let numeroRandom = 0;
let patron = [];
let patron2 = [];
let mensaje =
  "Presione cualquier tecla o <span class='empezar'>AQUI</span> para empezar";
let nivel = 0;
let mutearSonido = false;
let score = 0;
let scoreMax = 0;
const colores = ["green", "red", "yellow", "blue"];

//Manejo del Document Object Model 

$("#level-title").html(mensaje);

$(document).on("keydown", function () {
  if (juegoComenzado === false) {
    comenzarJuego();
    juegoComenzado = true;
  }
});

$(document).on("click", ".empezar", function () {
  if (juegoComenzado === false) {
    comenzarJuego();
    juegoComenzado = true;
  }
});

$(".mutear").on("click", function () {
  // verificar si el sonido esta muteado
  if (mutearSonido) {
    mutearSonido = false;
    $(this).text("Sonido🔊");
  } else {
    mutearSonido = true;
    $(this).text("Sonido🔇");
  }
});

colores.forEach((color) => {
  $("#" + color).on("click", function () {
    if (juegoComenzado === true) {
      patron2.push(color);
      animacionBoton(color);
      for (let index = 0; index < patron2.length; index++) {
        if (patron[index] === patron2[index]) {
          if (
            patron.length === patron2.length &&
            patron[patron.length - 1] === patron2[patron.length - 1]
          ) {
            let colorAleatorio = colorRandom();

            setTimeout(() => {
              animacionBoton(colorAleatorio);
            }, 1000);

            patron.push(colorAleatorio);
            patron2 = [];
            nivel++;
            mensaje = `Nivel ${nivel}`;
            $("#level-title").text(mensaje);
          }
        } else {
          gameOver();
        }
      }
    } else {
      console.log("presione tecla para comenzar juego");
    }
  });
});

// Funciones
function comenzarJuego() {
  setTimeout(generarColorRandom, 1000);
  mensaje = `Nivel ${nivel}`;
  $("#level-title").text(mensaje);
}

function generarColorRandom() {
  let colorRandomico = colorRandom();
  animacionBoton(colorRandomico);
  patron.push(colorRandomico);
}

// function sonIguales(arreglo1, arreglo2) {
//   // Verificar si tienen la misma longitud
//   if (arreglo1.length !== arreglo2.length) {
//     return false;
//   }

//   // Verificar si todos los elementos son iguales en las mismas posiciones
//   return arreglo1.every((elemento, indice) => elemento === arreglo2[indice]);
// }

function colorRandom() {
  numeroRandom = Math.floor(Math.random() * 4);
  switch (numeroRandom) {
    case 0:
      return "green";

    case 1:
      return "red";

    case 2:
      return "yellow";

    case 3:
      return "blue";

    default:
      break;
  }
}

function animacionBoton(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
  reproducirSonido(color);
}

function reproducirSonido(nombreAudio) {
  if (!mutearSonido) {
    let audioElement = new Audio("/sounds/" + nombreAudio + ".mp3");
    audioElement.play();
  }
}

function gameOver() {
  reproducirSonido("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
  juegoComenzado = false;
  patron = [];
  patron2 = [];
  nivel = 0;
  mensaje =
    "Fin del juego. Presione una tecla o <span class='empezar'>AQUI</span> para volver a empezar";

  $("#level-title").html(mensaje);
}
