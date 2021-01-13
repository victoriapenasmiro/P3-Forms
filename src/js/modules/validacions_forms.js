//Expresiones regulares que se utilizan para validar el formulario de suscripción.

var nomLlinatge = /([A-Zñ?\s?]){20,30}/i;
var username = /u([0-9]{6})[A-Z]/;
var tlf = /6[0-9]{2}-[0-9]{6}/;
var email = /([a-z]?[A-Z]?)+@[a-z]{1,20}.(es)?(com)?(net)?/;