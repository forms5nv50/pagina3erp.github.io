import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraAlumnos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const db = getFirestore();
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guardar);
  }
}

/** @param {Event} evt */
async function guardar(){
  var nombre = document.getElementById('nombre').value;
  var descripcion = document.getElementById('descripcion').value;
  var precio = document.getElementById('precio').value;
  var color = document.getElementById('color').value;
  var fechaLanzamiento = document.getElementById('fechaLanzamiento').value;
  let fecha = new Date(fechaLanzamiento);
  let fechaFirebase = firebase.firestore.Timestamp.fromDate(fecha);
  db.collection("HerramientasApple").add({
    nombre: nombre,
    descrpcicion: descripcion,
    precio: precio,
    color: color,
    fechaLanzamiento: fechaFirebase
  })
  .then(function(docRef){
    console.log("Documento escrito con el ID: ", docRef.id);
  })
  .catch(function(error){
    console.log("Error agregando el documento: ", error);
}
