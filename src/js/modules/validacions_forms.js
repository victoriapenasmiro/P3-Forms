//Expresiones regulares que se utilizan para validar el formulario de suscripción.

export var nomLlinatge = /^([A-Zñ?\s?]){20,30}/i;
export var username = /^u([0-9]{6})[A-Z]$/;
export var telefono = /[69][0-9]{2}-[0-9]{6}/;
export var email = /^([a-z]?[A-Z]?)+@[a-z]{1,20}.((es)?(com)?(net)?){1}/;
export var pass = /[A-Za-z0-9\W]{6,16}/;


//todo tests mochas
//ejecutar test comando: 

//crear funcions només per validar ses expressions regulars -- enviar a mocha