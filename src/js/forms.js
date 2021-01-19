import {
  nomLlinatge,
  username,
  telefono,
  email,
} from "./modules/validacions_forms.js"; //TODO

import { removeActiveClass, controlarBotonTop, menuMobile } from "./scripts.js";

$(document).ready(() => {
  $("footer").load("footer.html");
  $("header").load("header.html", iniciar);
});

//variable para controlar que el form es válido
var isValid;
//TODO crear objeto formulario

function iniciar() {
  /**** SCROLL TO TOP ****/
  var botonTop = document.getElementById("botonTop");
  //Función para que al hacer click vuelva al principio:
  botonTop.addEventListener("click", function () {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });

  window.onscroll = function () {
    controlarBotonTop();
  };
  /**** FIN SCROLL TO TOP ****/

  /***** RESETEO DE ESTILOS DEL NAV *****/
  let options = document
    .getElementById("optionsMenu")
    .getElementsByTagName("a");

  /* Cuando obtenemos los items desde getElementsByTagName
    es necesario convertirlos a Array para poder tratarlos con 
    un forEach */
  let optionsList = Array.prototype.slice.call(options);
  optionsList.forEach(removeActiveClass);
  /***** FIN RESETEO ESTILOS NAV *****/

  if (window.location.href.indexOf("signup") > -1) {
    document
      .getElementById("optionsMenu")
      .getElementsByTagName("a")[3]
      .classList.add("active");
  }

  document
    .getElementsByTagName("button")[0]
    .addEventListener("click", function () {
      document.getElementById("signup").style.display = "block";
    });

  document
    .getElementsByClassName("fa-bars")[0]
    .addEventListener("click", menuMobile);
  document
    .getElementsByClassName("fa-times")[0]
    .addEventListener("click", menuMobile);

  document.getElementById("submit").addEventListener("click", validarForm);
  document.getElementById("tlf").addEventListener("focusout", validarTlf);
  document.getElementById("username").addEventListener("focusout", validarUser);

  document
    .getElementsByClassName("togglePassword")[0]
    .addEventListener("mousedown", function () {
      togglePw(1);
    });
  document
    .getElementsByClassName("togglePassword")[0]
    .addEventListener("mouseup", function () {
      togglePw(1);
    });
  document
    .getElementsByClassName("togglePassword")[1]
    .addEventListener("mousedown", function () {
      togglePw(2);
    });
  document
    .getElementsByClassName("togglePassword")[1]
    .addEventListener("mouseup", function () {
      togglePw(2);
    });
}

/**
 * Función para validar los campos del formulario de registro
 */
function validarForm() {
  //todo validar todos campos al perder el focus
  isValid = validarNombre("fname", 0);//evitar globales
  isValid = validarNombre("lname", 1);
  isValid = validarTlf();
  isValid = validarEmail();
  isValid = validarUser();
  isValid = validarPassword();

  // if (validarNombre("fname", 0)) {
  //   if(validarNombre("lname", 1)) {
  //     if (validarTlf()) {

  //     }
  //   }
  // }
  

  if (isValid) {
    let peticion = new Object();
    peticion.name = document.getElementById("fname").value;
    peticion.surname = document.getElementById("lname").value;

    //TODO testar y completar
    console.info(peticion);
  }
}

/**
 * Función para validar los campos nombre y apellido
 * @param {String} str id del input
 * @param {int} pos posicion del input dentro del DOM
 */
function validarNombre(str, pos) {
  let name = document.getElementById(str);
  let warn = "";
  if (name == "") {
    warn = "Por favor, indica un valor";
    name.style.borderColor = "red";
    name.style.color = "white";
    errorValidacion(warn, pos);
    isValid = false;
  } else if (!nomLlinatge.test(name.value)) {//TODO import función validación
    warn = "Dato inválido. Debe ser min 20 letras y máximo 30.";
    name.style.borderColor = "red";
    name.style.color = "white";
    errorValidacion(warn, pos);
    isValid = false;
  } else {
    eliminarWarn(pos);
    name.style.borderColor = "#4d4d4d";
    name.style.color = "#4d4d4d";
    isValid = true;
  }
  return isValid;
}

/**
 * Función que valida el formato del tlf cargado
 */
function validarTlf() {
  let phone = document.getElementById("tlf");
  let warn = "";
  if (phone.value == "") {
    warn = "Por favor, indica un teléfono";
    errorValidacion(warn, 7);
    phone.style.borderColor = "red";
    phone.style.color = "white";
  } else if (!telefono.test(phone.value)) {
    warn =
      "Teléfono no válido. El formato debe ser el siguiente: 699-999999, debe empezar por 6 o 9";
    errorValidacion(warn, 7);
    phone.style.borderColor = "red";
    phone.style.color = "white";
    isValid = false;
  } else {
    phone.style.borderColor = "#4d4d4d";
    phone.style.color = "#4d4d4d";
    eliminarWarn(7);
    isValid = true;
  }
  return isValid;
}

/**
 * Función para validar el formato y coincidencia de los campos email
 */
function validarEmail() {
  const EMAIL1 = document.querySelector("#email");
  const EMAIL2 = document.querySelector("#email2");
  let error = "";

  //comprueba la coincidencia de los passwords
  if (EMAIL1.value != "") {
    if (EMAIL1.value != EMAIL2.value) {
      error = "Los emails introducidos no coinciden.";
      errorValidacion(error, 4);
      EMAIL1.style.borderColor = "red";
      EMAIL1.style.color = "white";
      isValid = false;
    } else if (!email.test(EMAIL1.value)) {
      error = "Formato incorrecto.";
      errorValidacion(error, 4);
      EMAIL1.style.borderColor = "red";
      EMAIL1.style.color = "white";
      isValid = false;
    } else {
      eliminarWarn(4);
      EMAIL1.style.borderColor = "#4d4d4d";
      EMAIL1.style.color = "#4d4d4d";
      EMAIL2.style.borderColor = "#4d4d4d";
      EMAIL2.style.color = "#4d4d4d";
      isValid = true;
    }
  } else if (EMAIL1.value == "") {
    error = "Por favor, introduce un email";
    errorValidacion(error, 4);
    EMAIL1.style.borderColor = "red";
    EMAIL1.style.color = "white";
    isValid = false;
  } else if (EMAIL2.value == "") {
    error = "Por favor, repite el email";
    errorValidacion(error, 4);
    EMAIL2.style.borderColor = "red";
    EMAIL2.style.color = "white";
    isValid = false;
  } else {
    error = "Por favor, introduce un email.";
    errorValidacion(error, 4);
    isValid = false;
  }
  return isValid;
}

/**
 * Función que valida el formato del username cargado
 */
function validarUser() {
  let user = document.getElementById("username");
  if (!username.test(user.value)) {
    alert(
      "nombre de usuario incorrecto. el formato debe ser el siguiente: u123456X"
    );
    //TODO pintar p bajo el div
    user.style.borderColor = "red";
    user.style.color = "white";
    isValid = false;
  } else {
    user.style.borderColor = "#4d4d4d";
    user.style.color = "#4d4d4d";
    isValid = true;
  }
  return isValid;
}

/**
 * Función para validar que se ha completado el campo password
 */
function validarPassword() {
  const PW1 = document.querySelector("#pw1");
  const PW2 = document.querySelector("#pw2");
  let warn = "";

  if (PW1.value == "") {
    warn = "Por favor, indica una contraseña";
    PW1.style.borderColor = "red";
    PW1.style.color = "white";
    errorValidacion(warn, 9);
    isValid = false;
  } else if (PW2.value == "") {
    warn = "Por favor, repite la contraseña";
    PW2.style.borderColor = "red";
    PW2.style.color = "white";
    errorValidacion(warn, 9);
    isValid = false;

    //comprueba la coincidencia de los passwords
  } else if (PW1.value != PW2.value && PW1.value != "") {
    warn = "Las contraseñas no coinciden.";
    errorValidacion(warn, 9);
    isValid = false;
  } else if (1 == 1) {
    //corregir
    //todo validar expresionregular
  } else {
    eliminarWarn(9);
    PW1.style.borderColor = "#4d4d4d";
    PW1.style.color = "#4d4d4d";
    PW2.style.borderColor = "#4d4d4d";
    PW2.style.color = "#4d4d4d";
    isValid = true;
  }

  return isValid;
}

/**
 * Función para mostrar u ocultar el pw con el click izquierdo del ratón
 */
function togglePw(num) {
  const PW = document.querySelector("#pw" + num);
  if (event.button == 0) {
    //solo ejecutar para click izquierdo
    // toggle the type attribute
    let type = PW.getAttribute("type") === "password" ? "text" : "password";
    PW.setAttribute("type", type);
    // toggle the eye slash icon
    this.classList.toggle("fa-eye-slash");
  }
}

/**
 * Función para pintar en pantalla el mensaje de error bajo los campos afectados
 * @param {string} warn mensaje error
 */
function errorValidacion(msg, pos) {
  let firstDiv = document.getElementById("signup");
  let warn = document.createElement("p");
  warn.style.color = "red";
  warn.style.fontSize = "12px";
  warn.style.textAlign = "right";
  warn.innerHTML = msg;

  if (firstDiv.getElementsByTagName("div")[pos].nextSibling.nodeName == "P") {
    firstDiv.getElementsByTagName("div")[pos].nextSibling.remove();
  }

  if (firstDiv.getElementsByTagName("div")[pos].nextSibling.nodeName != "P") {
    firstDiv
      .getElementsByTagName("div")
      [pos].insertAdjacentElement("afterend", warn);
  }
}

/**
 * Función para eliminar el mensaje de error
 * @param {int} pos posicion del elemento a eliminar
 */
function eliminarWarn(pos) {
  let errorMessage = document
    .getElementById("signup")
    .getElementsByTagName("div")[pos];

  if (errorMessage.nextSibling.nodeName == "P") {
    errorMessage.nextSibling.remove();
  }
}

function openList() {
  //TODO cuando pinche en label country que se despliegue la lista
  /*   <label id="l">sachin</label>
    <select id="s">
        <option>1</option>
        <option>2</option>        
        <option>3</option>
        <option>4</option>
   </select>  

$("#l").click(function () {
    var size = $('#s option').size();
    if (size != $("#s").prop('size')) {
        $("#s").prop('size', size);
    } else {
        $("#s").prop('size', 1);
    }
})*/
}

//TODO testeos mocha --> ver carpeta tests-mochaE& en git