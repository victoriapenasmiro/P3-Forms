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
  it("Solo se admiten caracteres y debe ser una cadena entre 20 y 30", () => {
    assert.strictEqual(testNombre("Maria Victoria Peñas Miró"), true);
  });

  it("Si se carga algún número o caracter alfanumérico no funcionará", () => {
    //tengo un error en el assert ??
    assert.strictEqual(testNombre("?%Victoria?Peñas=Miró"), false);
  });
});

describe("Función para validar el formato del correo electrónico", function () {
  it("el nombre delante del dominio solo puede contener letras mayúsculas o minúsculas", () => {
    assert.strictEqual(testEmail("123_hola@prueba.es"), false);
  });

  it("el nombre delante del dominio solo puede contener letras mayúsculas o minúsculas", () => {
    assert.strictEqual(testEmail("hola@prueba.es"), true);
  });

  it("Solo debe haber una @", () => {
    assert.strictEqual(testEmail("@hola@prueba.es"), false);
  });

  it("Solo debe haber un .", () => {
    assert.strictEqual(testEmail("h.ola@prueba.es"), false);
  });

  it("el dominio solo puede contener máximo 20 letras minúsculas", () => {
    assert.strictEqual(
      testEmail("hola@pruebapruebapruebapruebaprueba.es"),
      false
    );
  });

  it("la extensión solo puede ser ‘es’, ‘com’ o ‘net’", () => {
    assert.strictEqual(testEmail("hola@prueba.eu"), false);
  });
});

describe("Función para validar el formato del username", function () {
  it("Debe empezar por la letra u", () => {
    assert.strictEqual(testUser("a123456T"), false);
  });

  it("Debe empezar por la letra u", () => {
    assert.strictEqual(testUser("u123456T"), true);
  });

  it("Debe empezar por la letra u y contener 6 numeros a continuación", () => {
    assert.strictEqual(testUser("u1234T"), false);
  });

  it("Debe empezar por la letra u, contener 6 numeros a continuación y terminar con una letra mayúscula", () => {
    assert.strictEqual(testUser("u123456"), false);
  });

  it("Debe empezar por la letra u, contener 6 numeros a continuación y terminar con una letra mayúscula", () => {
    assert.strictEqual(testUser("u123456a"), false);
  });

  it("Debe empezar por la letra u, contener 6 numeros a continuación y terminar con una letra mayúscula", () => {
    assert.strictEqual(testUser("u123456?"), false);
  });
});

describe("Función para validar el formato del teléfono", function () {
  it("Debe empezar 9 o 6", () => {
    assert.strictEqual(testTlf("799-000000"), false);
  });

  it("Debe empezar 9 o 6 --> 6", () => {
    assert.strictEqual(testTlf("699-000000"), true);
  });

  it("Debe empezar 9 o 6 --> 9", () => {
    assert.strictEqual(testTlf("999-000000"),true);
  });

  it("Debe seguir este formato 699-999999 --> test error", () => {
    assert.strictEqual(testTlf("699000000"), false);
  });

  it("Debe seguir este formato 699-999999 --> test OK", () => {
    assert.strictEqual(testTlf("699-123456"), true);
  });
});

describe("Función para validar el formato del password", function () {
  it("Debe tener una longitud de entre 6 y 16 caracteres --> prueba error", () => {
    assert.strictEqual(testPw("Si76%"), false);
  });

  it("Debe tener una longitud de entre 6 y 16 caracteres --> prueba OK", () => {
    assert.strictEqual(testPw("FBMoll1234%aaaaa"), true);
  });

  it("Debe tener almenos una letra mayúscula", () => {
    assert.strictEqual(testPw("FBMOLL1234%AAAAA"), false);
  });

  it("Debe tener almenos una letra minúscula", () => {
    assert.strictEqual(testPw("fbmoll1234%aaaaa"), false);
  });

  it("Debe tener almenos un número", () => {
    assert.strictEqual(testPw("fBmoll??Fd%aaaaa"), false);
  });

  it("Debe tener almenos un símbolo", () => {
    assert.strictEqual(testPw("FBMoll1234aaaaaa"), false);
  });

});
