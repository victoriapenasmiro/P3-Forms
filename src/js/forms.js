import {
  testNombre,
  testUser,
  testTlf,
  testEmail,
  testPw,
} from "./modules/validacions_forms.mjs";

import { removeActiveClass, controlarBotonTop, menuMobile } from "./scripts.js";

$(document).ready(() => {
  $("footer").load("footer.html");
  $("header").load("header.html", iniciar);
});

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

  document.getElementById("signupBtn").addEventListener("click", registro);

  document.getElementById("signinBtn").addEventListener("click", login);

  document.getElementById("submit").addEventListener("click", validarForm);
  document.getElementById("fname").addEventListener("focusout", function () {
    validarNombre("fname", 0);
  });
  document.getElementById("lname").addEventListener("focusout", function () {
    validarNombre("lname", 1);
  });
  document.getElementById("tlf").addEventListener("focusout", validarTlf);
  document.getElementById("email").addEventListener("focusout", validarEmail);
  document.getElementById("email2").addEventListener("focusout", validarEmail);
  document.getElementById("username").addEventListener("focusout", function () {
    validarUser("username")});
  document.getElementById("usuario").addEventListener("focusout", function () {
    validarUser("usuario")});
  document.getElementById("pw1").addEventListener("focusout", validarPassword);
  document.getElementById("pw2").addEventListener("focusout", validarPassword);
  document.getElementById("pw3").addEventListener("focusout", validarPassword);


  document
    .getElementsByClassName("togglePassword")[0]
    .addEventListener("mousedown", function () {
      togglePw(this, 1);
    });
  document
    .getElementsByClassName("togglePassword")[0]
    .addEventListener("mouseup", function () {
      togglePw(this, 1);
    });
  document
    .getElementsByClassName("togglePassword")[1]
    .addEventListener("mousedown", function () {
      togglePw(this, 2);
    });
  document
    .getElementsByClassName("togglePassword")[1]
    .addEventListener("mouseup", function () {
      togglePw(this, 2);
    });

    document
    .getElementsByClassName("togglePassword")[2]
    .addEventListener("mousedown", function () {
      togglePw(this, 3);
    });
  document
    .getElementsByClassName("togglePassword")[2]
    .addEventListener("mouseup", function () {
      togglePw(this, 3);
    });

  document.getElementById("closeMsg").addEventListener("click", function () {
    this.parentElement.style.display = "none";
  });
}

/**
 * Función para mostrar el formulario de registro
 */
function registro() {
  this.style.display = "none";
  document.getElementById("signinBtn").style.display = "block";
  //document.getElementById("signin").style.display = "none";
  document.getElementById("signup").style.display = "block";
  removeActiveClass(
    document.getElementById("optionsMenu").getElementsByTagName("a")[4]
  );
  document
    .getElementById("optionsMenu")
    .getElementsByTagName("a")[3]
    .classList.add("active");
  document.getElementsByTagName("h1")[0].innerHTML = "Formulario de registro";
  document.getElementById("login").style.display = "none";
}

/**
 * Función para mostrar el formulario de login
 */
function login() {
  this.style.display = "none";
  document.getElementById("signupBtn").style.display = "block";
  document.getElementById("signup").style.display = "none";
  //document.getElementById("signin").style.display = "block";
  removeActiveClass(
    document.getElementById("optionsMenu").getElementsByTagName("a")[3]
  );
  document
    .getElementById("optionsMenu")
    .getElementsByTagName("a")[4]
    .classList.add("active");
    document.getElementsByTagName("h1")[0].innerHTML = "Formulario de Login";
}
/**
 * Función para validar los campos del formulario de registro
 */
function validarForm() {
  let isValid = false;
  let ageChecked;

  if (validarNombre("fname", 0)) {
    if (validarNombre("lname", 1)) {
      if (validarEmail()) {
        if (validarTlf()) {
          if (validarUser()) {
            if (validarPassword()) {
              //para validar si el radio button está seleccionado
              const AGES = document.querySelectorAll('input[name="age"]');
              let selectedValue;
              for (let i = 0; i < AGES.length; i++) {
                if (AGES[i].checked) {
                  isValid = true;
                  i == 0 ? (ageChecked = "-18") : (ageChecked = "18");
                  break;
                }
              }
            }
          }
        }
      }
    }
  }

  if (isValid) {
    console.info(crearObj(ageChecked));
    eliminarWarn(3,"signup"); //elimina el aviso del age
    document.getElementById("closeMsg").parentElement.style.display = "block";
    document.getElementById("signup").style.display = "none";
    document.getElementById("signupBtn").style.display = "block";
  } else {
    //si no es válido es porqué el age no está seleccionado
    let warn = "Por favor, marca una opción";
    errorValidacion(warn, 3,"signup");
  }
}

/**
 * Función para crear el objeto "peticion" con todos los campos rellenador por el usuario.
 * @param {String} ageChecked radio option selected age indicator
 */
function crearObj(ageChecked) {
  let peticion = new Object();
  peticion.name = document.getElementById("fname").value;
  peticion.surname = document.getElementById("lname").value;
  peticion.country = document.getElementById("country").value;
  peticion.age = ageChecked;
  peticion.email = document.getElementById("email").value;
  peticion.tlf = document.getElementById("tlf").value;
  peticion.user = document.getElementById("username").value;
  peticion.pw = document.getElementById("pw1").value;

  return peticion;
}

/**
 * Función para validar los campos nombre y apellido
 * @param {String} str id del input
 * @param {int} pos posicion del input dentro del DOM
 */
function validarNombre(str, pos) {
  let name = document.getElementById(str);
  let warn = "";
  let isValid;
  if (name.value == "") {
    warn = "Por favor, indica un valor";
    name.focus();
    errorValidacion(warn, pos,"signup");
    isValid = false;
  } else if (!testNombre(name.value)) {
    warn = "Dato inválido. Debe ser min 20 letras y máximo 30.";
    name.focus();
    errorValidacion(warn, pos,"signup");
    isValid = false;
  } else {
    eliminarWarn(pos,"signup");
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
  let isValid;
  if (phone.value == "") {
    warn = "Por favor, indica un teléfono";
    errorValidacion(warn, 7,"signup");
    phone.focus();
  } else if (!testTlf(phone.value)) {
    warn =
      "Teléfono no válido. El formato debe ser el siguiente: 699-999999, debe empezar por 6 o 9";
    errorValidacion(warn, 7,"signup");
    phone.focus();
    isValid = false;
  } else {
    eliminarWarn(7,"signup");
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
  let isValid;

  //comprueba la coincidencia de los passwords
  if (EMAIL1.value != "") {
    if (EMAIL1.value != EMAIL2.value) {
      error = "Los emails introducidos no coinciden.";
      errorValidacion(error, 4,"signup");
      EMAIL2.focus();
      isValid = false;
    } else if (!testEmail(EMAIL1.value)) {
      error = "Formato incorrecto.";
      errorValidacion(error, 4,"signup");
      EMAIL1.focus();
      isValid = false;
    } else {
      eliminarWarn(4,"signup");
      isValid = true;
    }
  } else if (EMAIL1.value == "") {
    error = "Por favor, introduce un email";
    errorValidacion(error, 4,"signup");
    EMAIL1.focus();
    isValid = false;
  } else if (EMAIL2.value == "") {
    error = "Por favor, repite el email";
    errorValidacion(error, 4,"signup");
    EMAIL2.focus();
    isValid = false;
  } else {
    error = "Por favor, introduce un email.";
    errorValidacion(error, 4,"signup");
    isValid = false;
  }
  return isValid;
}

/**
 * Función que valida el formato del username cargado
 */
function validarUser(id) {
  let user = document.getElementById(id);
  let error = "";
  let isValid;
  if (!testUser(user.value)) {
    error =
      "Nombre de usuario incorrecto. El formato debe ser el siguiente: u123456X";
      user == "username" ? errorValidacion(error, 8,"signup") : errorValidacion(error, 0,"login");
    user.focus();
    isValid = false;
  } else {
    user == "username" ? eliminarWarn(8,"signup") : eliminarWarn(0,"login");
    isValid = true;
  }
  return isValid;
}

/**
 * Función para validar que se ha completado el campo password
 * Es valida tanto para el formulario de registro como el de login
 */
function validarPassword() {
  const id = document.getElementById(this.id);
  const PW1 = document.querySelector("#pw1");
  const PW2 = document.querySelector("#pw2");
  let isValid;
  let warn = "";

    if (id.value == "") {
    warn = "Por favor, indica una contraseña";
    id.focus();
    this.id == "pw3" ? errorValidacion(warn, 0, "login") : errorValidacion(warn, 9, "signup");
    isValid = false;
  } else if (id== "pw2" && id.value == "") {
    warn = "Por favor, repite la contraseña";
    id.focus();
    errorValidacion(warn, 9, "signup");
    isValid = false;
    //comprueba la coincidencia de los passwords
  } else if (PW1.value != PW2.value && id.value != "") {
    warn = "Las contraseñas no coinciden.";
    errorValidacion(warn, 9, "signup");
    PW2.focus();
    isValid = false;
  } else if (!testPw(id.value)) {
    warn = "El formato de contraseña no es correcto.";
    id.focus();
    this.id == "pw3" ? errorValidacion(warn, 0, "login") : errorValidacion(warn, 9, "signup");
    isValid = false;
  } else {
    this.id == "pw3" ? eliminarWarn(0,"login") : eliminarWarn(9,"signup");
    isValid = true;
  }

  return isValid;
}

/**
 * Función para mostrar u ocultar el pw con el click izquierdo del ratón
 */
function togglePw(element, num) {
  const PW = document.querySelector("#pw" + num);
  if (event.button == 0) {
    //solo ejecutar para click izquierdo
    // toggle the type attribute
    let type = PW.getAttribute("type") === "password" ? "text" : "password";
    PW.setAttribute("type", type);
    // toggle the eye slash icon
    element.classList.toggle("fa-eye-slash");
  }
}

/**
 * Función para pintar en pantalla el mensaje de error bajo los campos afectados
 * @param {string} warn mensaje error
 */
function errorValidacion(msg, pos, id) {
  let firstDiv = document.getElementById(id);
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
function eliminarWarn(pos,id) {
  let errorMessage = document
    .getElementById(id)
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
