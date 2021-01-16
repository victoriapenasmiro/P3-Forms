import {
  nomLlinatge,
  username,
  tlf,
  email,
} from "./modules/validacions_forms.js"; //TODO

import { removeActiveClass, controlarBotonTop, menuMobile } from "./scripts.js";

$(document).ready(() => {
  $("footer").load("footer.html");
  $("header").load("header.html", iniciar);
});

//variable para controlar que el form es válido
var isValid;

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

  document
    .getElementById("username")
    .addEventListener("focusout", validarUser);

  document
    .getElementsByClassName("togglePassword")[0]
    .addEventListener("mousedown", function() { togglePw(1); });
  document
    .getElementsByClassName("togglePassword")[0]
    .addEventListener("mouseup", function() { togglePw(1); });
  document
    .getElementsByClassName("togglePassword")[1]
    .addEventListener("mousedown", function() { togglePw(2); });
  document
    .getElementsByClassName("togglePassword")[1]
    .addEventListener("mouseup", function() { togglePw(2); });
}

/**
 * Función para validar los campos del formulario de registro
 */
function validarForm() {
  let name = document.getElementById("fname");
  let surname = document.getElementById("lname");
  let firstDiv = document.getElementById("signup");
  let warn = document.createElement("p");
  warn.style.color = "red";
  warn.style.fontSize = "12px";
  warn.innerHTML = "Nom invàlid o Longitud màxima superada.";
  let warn2 = warn.cloneNode(true);

  isValid = validarNombre(name, firstDiv, warn, 0, nomLlinatge);
  isValid = validarNombre(surname, firstDiv, warn2, 1, nomLlinatge);
  isValid = validarUser();
}

function validarNombre(str, firstDiv, warn, pos, expresion) {
  if (!expresion.test(str.value)) {
    if (firstDiv.getElementsByTagName("div")[pos].nextSibling.nodeName != "P") {
      firstDiv
        .getElementsByTagName("div")
        [pos].insertAdjacentElement("afterend", warn);
    }
    return false;
  } else {
    if (firstDiv.getElementsByTagName("div")[pos].nextSibling.nodeName == "P") {
      firstDiv.getElementsByTagName("div")[pos].nextSibling.remove();
    }
    return true;
  }
}

function validarUser() {
  let user = document.getElementById("username");
  if (!username.test(user.value)) {
    alert("nombre de usuario incorrecto. el formato debe ser el siguiente: u123456X");
    user.style.backgroundColor = "red";
    return false;
  } else {
    return true;
  }
}

function validarPassword(){
  const PW1 = document.querySelector("#pw1");
  const PW2 = document.querySelector("#pw2");
  let firstDiv = document.getElementById("signup");

  //comprueba la coincidencia de los passwords
  if(PW1.value == PW2.value && PW1.value != ""){
    let warn = document.createElement("p");
    warn.style.color = "red";
    warn.style.fontSize = "12px";
    warn.innerHTML = "Las contraseñas no coinciden.";

    isValid = validarNombre(PW2, firstDiv, warn, pos , expresion);  //TODO validar que cumple formatos según accesibilidad, actualizar pos y expression

  }
}

/**
 * Función para mostrar u ocultar el pw
 */
function togglePw(num) {
  const PW = document.querySelector("#pw"+num);
  // if (event.button == 2) { //TODO onmousedown con derecho no funciona bien
  // toggle the type attribute
  let type = PW.getAttribute("type") === "password" ? "text" : "password";
  PW.setAttribute("type", type);
  // toggle the eye slash icon
  this.classList.toggle("fa-eye-slash");
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
