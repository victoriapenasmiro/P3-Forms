// FUNCIONES DE VALIDACIÓN PARA MOCHA

/**
 * Función para validar que el nombre o apellido introducido es válido
 * @param {String} name nombre o apellido
 */
export function testNombre(name){
    let nomLlinatge = /^[A-ZÀ-Úñ?\s?]{20,30}$/i;
    let valido = nomLlinatge.test(name);
    return valido;
}

/**
 * Función para validar que el usuario introducido es válido
 * @param {String} user username
 */
export function testUser(user){
    let username = /^u[0-9]{6}[A-Z]$/;
    let valido = username.test(user);
    return valido;
}

/**
 * Función para validar que el teléfono introducido es válido
 * @param {String} name telefono
 */
export function testTlf(tlf){
    let telefono = /^[69][0-9]{2}-[0-9]{6}$/;
    let valido = telefono.test(tlf);
    return valido;
}

/**
 * Función para validar que el email introducido es válido
 * @param {String} str email
 */
export function testEmail(str){
    let email = /^([a-zA-Z]?)+@[a-z]{1,20}.((es)?(com)?(net)?){1}$/;
    let valido = email.test(str);
    return valido;
}

/**
 * Función para validar que la contraseña introducida es válido
 * @param {String} str password
 */
export function testPw(str){
    let passExp = [/[A-Z]/,/[a-z]/,/[0-9]/,/\W/];
    let upper = 0;
    let lower = 0;
    let num = 0;
    let special = 0;
    let valido = false;

    if (str.length >= 6 && str.length <= 16) {
        for (let i = 0; i < str.length ;i++){
            for (let j = 0; j < passExp.length; j++){
                if (passExp[j].test(str.charAt(i))){
                    j == 0 ? upper++ : false;
                    j == 1 ? lower++ : false;
                    j == 2 ? num++ : false;
                    j == 3 ? special++ : false;
                }
            }   
        }
        upper > 0 && lower > 0 && num > 0 && special > 0 ? valido = true : valido = false;
    }

    return valido;
}