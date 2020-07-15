'use strict'

exports.saluda = function saluda (nombre){
    console.log("Hola " + nombre);
}

const despide = exports.despide = function (nombre){
    console.log("Hasta luego " + nombre);
}

exports.suma = function suma (x,y){
    var suma  = x + y;
    console.log(`La suma de ${x} + ${y} = ${suma}`);
    return suma;
}

