// Variables
let juegoComenzado = false;
let numeroRandom = 0;
let patron = [];
let patron2 = [];
let mensaje = "Presione cualquier boton para empezar";
let nivel = 0;
const colores = ["green", "red", "yellow", "blue"];

$("#level-title").text(mensaje);

$(document).on("keydown", function () {
  if (juegoComenzado === false) {
    comenzarJuego();
    juegoComenzado = true;
  }
});

colores.forEach((color) => {
  $("#" + color).on("click", function () {
    if (juegoComenzado === true) {
      patron2.push(color);
      animacionBoton(color);
      for (let index = 0; index < patron2.length; index++) {
        debugger;
        // Creo que encontre el problema, al dar la ultima iteracion comienza desde el indice
        // 0 y el indice 0 siempre seran iguales si se llega al penultimo elemento del arreglo
        //  entonces pasa a la segunda condicion para verificar si la longitud de ambos arreglos
        // es igual y como si son iguales, sin importar que el ultimo elemento sea otro distinto
        // validara la condicion como verdadera y pusheara un nuevo color
        if (patron[index] === patron2[index]) {
          if (patron.length === patron2.length) {
            let colorAleatorio = colorRandom();

            setTimeout(() => {
              animacionBoton(colorAleatorio);
            }, 1000);

            patron.push(colorAleatorio);
            console.log(patron);
            console.log(patron2);
            patron2 = [];
            nivel++;
            mensaje = `Nivel ${nivel}`;
            $("#level-title").text(mensaje);
          }
        } else {
          console.log(patron);
          console.log(patron2);
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

function sonIguales(arreglo1, arreglo2) {
  // Verificar si tienen la misma longitud
  if (arreglo1.length !== arreglo2.length) {
    return false;
  }

  // Verificar si todos los elementos son iguales en las mismas posiciones
  return arreglo1.every((elemento, indice) => elemento === arreglo2[indice]);
}

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
}

function gameOver() {
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
  mensaje = `¡¡Game Over!! Presione una tecla para volver a empezar :) `;

  $("#level-title").text(mensaje);
}
