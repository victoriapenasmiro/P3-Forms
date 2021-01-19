import assert from "assert";
//ver repo https://github.com/classicoman2/tests-mochajs-ES6

import {
  testNombre,
  testUser,
  testTlf,
  testEmail,
  testPw,
} from "../src/js/modules/validacions_forms.mjs";

/**
 * S’han creat 4 describe i un mínim de 16 it functions, amb la següent distribució:
5 it functions per la funció de validació de email 
5 it functions per la funció de validació de username  
3 it functions per la funció de validació de name password
3 it functions per la funció de validació de telephone
 */

describe("Función para testar si el campo de nombre se valida correctamente", function () {
    // it('Solo se admiten caracteres y debe ser una cadena entre 20 y 30", () => {
    //     assert.strictEqual(testNombre("Victoria Peñas Miró")), true);
    //   });
    
    it("Si se carga algún número o caracter alfanumérico no funcionará", () => {
        assert.strictEqual(testNombre("?%Victoria?Peñas=Miró")), false);
    });

    it('suma entre 2 numeros', () => {
        assert.strictEqual( isNaN(suma(100, 'patata')), true )
    })

});

// describe("Función para validar el formato del correo electrónico", function () {
//   it("el nombre delante del dominio solo puede contener letras mayúsculas o minúsculas", () => {
//     assert.strictEqual(testEmail("123_hola@prueba.es")), false);
//   });

//   it("el nombre delante del dominio solo puede contener letras mayúsculas o minúsculas", () => {
//     assert.strictEqual(testEmail("hola@prueba.es")), true);
//   });

//   it("Solo debe haber una @", () => {
//     assert.strictEqual(testEmail("@hola@prueba.es")), false);
//   });

//   it("Solo debe haber un .", () => {
//     assert.strictEqual(testEmail("h.ola@prueba.es")), false);
//   });

//   it("el dominio solo puede contener máximo 20 letras minúsculas", () => {
//     assert.strictEqual(testEmail("hola@pruebapruebapruebapruebaprueba.es")), false);
//   });

//   it("la extensión solo puede ser ‘es’, ‘com’ o ‘net’", () => {
//     assert.strictEqual(testEmail("hola@prueba.eu")), false);
//   });
// });

// describe("Función para validar el formato del username", function () {
//     it("Debe empezar por la letra u", () => {
//       assert.strictEqual(testUser("a123456T")), false);
//     });

//     it("Debe empezar por la letra u", () => {
//         assert.strictEqual(testUser("u123456T")), true);
//     });
// });