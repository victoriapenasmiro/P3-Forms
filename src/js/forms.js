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
  let botonTop = document.getElementById("botonTop");
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
  document.getElementById("submit").addEventListener("click", validarRegistro);
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
    validarUser("username");
  });
  document.getElementById("usuario").addEventListener("focusout", function () {
    validarUser("usuario");
  });
  document.getElementById("pw1").addEventListener("focusout", validarPassword);
  document.getElementById("pw2").addEventListener("focusout", validarPassword);
  document.getElementById("pw3").addEventListener("focusout", validarPassword);
  document.getElementById("loginBtn").addEventListener("click", validarLogin);
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
    location.reload();
  });
}

/**
 * Función para mostrar el formulario de registro
 */
function registro() {
  //controlo si accedo desde un form o desde la primera pantalla
  let existeHr = document.getElementsByTagName("hr")[0];
  let signupForm = document.getElementById("signup");
  let loginBtn = document.createElement("button");
  let container = document.createElement("div");
  let tittle = document.createElement("span");
  tittle.innerHTML =
    'Do you have an account? Login! <i class="fas fa-sign-in-alt"></i>';
  container.appendChild(tittle);
  loginBtn.id = "loginBtn";
  loginBtn.innerHTML = "Sign In";
  loginBtn.addEventListener("click", login);
  container.appendChild(loginBtn);
  signupForm.parentNode.insertBefore(container, signupForm.nextSibling);

  document.getElementById("login").style.display = "none";
  document.getElementById("signup").style.display = "block";

  if (existeHr != null) {
    document.getElementsByTagName("hr")[0].remove();
    document.getElementsByTagName("h1")[0].nextElementSibling.remove();
  } else {
    document.getElementById("login").nextElementSibling.remove();
  }
  
  removeActiveClass(
    document.getElementById("optionsMenu").getElementsByTagName("a")[4]
  );
  document
    .getElementById("optionsMenu")
    .getElementsByTagName("a")[3]
    .classList.add("active");

  document.getElementsByTagName("h1")[0].innerHTML = "Formulario de registro";
  document.getElementById("login").style.display = "none";
  getPaises(); //pinto los paises
}

/**
 * Función para mostrar el formulario de login
 */
function login() {
  //controlo si accedo desde un form o desde la primera pantalla
  let existeHr = document.getElementsByTagName("hr")[0];
  let loginForm = document.getElementById("login");
  let registroBtn = document.createElement("button");
  let container = document.createElement("div");
  let tittle = document.createElement("span");
  tittle.innerHTML = 'New user? Register NOW! <i class="fas fa-user-plus"></i>';
  container.appendChild(tittle);
  registroBtn.id = "signupBtn";
  registroBtn.innerHTML = "Sign Up";
  registroBtn.addEventListener("click", registro);
  container.appendChild(registroBtn);
  loginForm.parentNode.insertBefore(container, loginForm.nextSibling);

  document.getElementById("signup").style.display = "none";
  document.getElementById("login").style.display = "flex";

  if (existeHr != null) {
    document.getElementsByTagName("hr")[0].remove();
    document.getElementsByTagName("h1")[0].nextElementSibling.remove();
  } else {
    document.getElementById("signup").nextElementSibling.remove();
  }

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
function validarRegistro() {
  let isValid = false;
  let ageChecked;

  if (validarNombre("fname", 0)) {
    if (validarNombre("lname", 1)) {
      if (validarEmail()) {
        if (validarTlf()) {
          if (validarUser("username")) {
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
    eliminarWarn(3, "signup"); //elimina el aviso del age
    document.getElementById("closeMsg").parentElement.style.display = "block";
    document.getElementById("signup").nextSibling.remove();
    document.getElementById("signup").style.display = "none";
    document.getElementById("signupBtn").style.display = "block";
  } else {
    //si no es válido es porqué el age no está seleccionado
    let warn = "Por favor, marca una opción";
    errorValidacion(warn, 3, "signup");
  }
}

function validarLogin() {
  //controlo si accedo desde un form o desde la primera pantalla
  let existeHr = document.getElementsByTagName("hr")[0];
  if (validarUser("usuario")) {
    if (validarPassword()) {
      document.getElementById("closeMsg").parentElement.style.display = "block";
      document.getElementById("login").style.display = "none";
      document.getElementById("loginBtn").style.display = "block";
      existeHr != ""
        ? document.getElementById("login").nextSibling.remove()
        : false;
    }
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
    errorValidacion(warn, pos, "signup");
    isValid = false;
  } else if (!testNombre(name.value)) {
    warn = "Dato inválido. Debe ser min 20 letras y máximo 30.";
    name.focus();
    errorValidacion(warn, pos, "signup");
    isValid = false;
  } else {
    eliminarWarn(pos, "signup");
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
    errorValidacion(warn, 7, "signup");
    phone.focus();
  } else if (!testTlf(phone.value)) {
    warn =
      "Teléfono no válido. El formato debe ser el siguiente: 699-999999, debe empezar por 6 o 9";
    errorValidacion(warn, 7, "signup");
    phone.focus();
    isValid = false;
  } else {
    eliminarWarn(7, "signup");
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
      errorValidacion(error, 4, "signup");
      EMAIL2.focus();
      isValid = false;
    } else if (!testEmail(EMAIL1.value)) {
      error = "Formato incorrecto.";
      errorValidacion(error, 4, "signup");
      EMAIL1.focus();
      isValid = false;
    } else {
      eliminarWarn(4, "signup");
      isValid = true;
    }
  } else if (EMAIL1.value == "") {
    error = "Por favor, introduce un email";
    errorValidacion(error, 4, "signup");
    EMAIL1.focus();
    isValid = false;
  } else if (EMAIL2.value == "") {
    error = "Por favor, repite el email";
    errorValidacion(error, 4, "signup");
    EMAIL2.focus();
    isValid = false;
  } else {
    error = "Por favor, introduce un email.";
    errorValidacion(error, 4, "signup");
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
    user.id == "username"
      ? errorValidacion(error, 8, "signup")
      : errorValidacion(error, 0, "login");
    user.focus();
    isValid = false;
  } else {
    user.id == "username"
      ? eliminarWarn(8, "signup")
      : eliminarWarn(0, "login");
    isValid = true;
  }
  return isValid;
}

/**
 * Función para validar que se ha completado el campo password
 * Es valida tanto para el formulario de registro como el de login
 */
function validarPassword() {
  let isValid;
  let warn = "";
  let pw;
  //validación formulario registro
  if (document.getElementById("login").style.display == "none") {
    pw = document.querySelector("#pw1");
    const PW2 = document.querySelector("#pw2");

    if (checkPwErrors(pw)) {
      isValid = true;
      if (PW2.value == "") {
        warn = "Por favor, repite la contraseña";
        PW2.focus();
        errorValidacion(warn, 9, "signup");
        isValid = false;
      } else if (pw.value != PW2.value && pw.value != "") {
        warn = "Las contraseñas no coinciden.";
        errorValidacion(warn, 9, "signup");
        PW2.focus();
        isValid = false;
      } else {
        eliminarWarn(9, "signup");
      }
    }
    //validación formulario login
  } else {
    pw = document.querySelector("#pw3");
    if (checkPwErrors(pw)) {
      isValid = true;
      eliminarWarn(0, "login");
    }
  }
  return isValid;
}

/**
 * Función que comprueba si el formato de contraseña introducido es válido
 * @param {Object} pw input[type="password"] que se tiene que validar
 */
function checkPwErrors(pw) {
  let warn = "";
  let isValid = true;
  if (pw.value == "") {
    warn = "Por favor, indica una contraseña";
    pw.focus();
    pw.id == "pw3"
      ? errorValidacion(warn, 0, "login")
      : errorValidacion(warn, 9, "signup");
    isValid = false;
  } else if (!testPw(pw.value)) {
    warn = "El formato de contraseña no es correcto.";
    pw.focus();
    pw.id == "pw3"
      ? errorValidacion(warn, 0, "login")
      : errorValidacion(warn, 9, "signup");
    isValid = false;
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
function eliminarWarn(pos, id) {
  let errorMessage = document.getElementById(id).getElementsByTagName("div")[
    pos
  ];

  if (errorMessage.nextSibling.nodeName == "P") {
    errorMessage.nextSibling.remove();
  }
}

/**
 * Función para recuperar el listado de países desde una conexión API
 */
function getPaises() {
  const API = "https://restcountries.eu/rest/v2/all?fields=name;";
  let fieldCountries = document.getElementById("country");
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let JSONdata = this.responseText;
      let data = JSON.parse(JSONdata);

      data.forEach((country) => {
        let newCountry = document.createElement("option");
        newCountry.value = country.name;
        newCountry.innerHTML = country.name;
        fieldCountries.appendChild(newCountry);
      });
    }
  };

  xhr.open("GET", API, true);
  xhr.send();
}
