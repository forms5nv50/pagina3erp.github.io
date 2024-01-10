import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";
import {
  iniciaSesión,
  terminaSesión
} from "./seguridad.js";
import { 
  asignarRolCliente,
  asignarRolAdmin
} from "./asignarRolCliente.js";

/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLImageElement} */
const avatar = document.querySelector("#avatar");

/* Escucha cambios de usuario.
 * El primer parámetro es una
 * función que se invoca cada que
 * hay un cambio de usuario y
 * recibe los datos del usuario.
 * El segundo parámetro es una
 * función que se invoca cuando se
 * presenta un error en un cambio
 * de usuario y recibe un Error.
 */
getAuth().onAuthStateChanged(
  muestraSesión, muestraError);

/** Muestra los datos del usuario
 * o manda a iniciar sesión en
 * caso de que no haya empezado.
 * @param {import(
    ";../lib/tiposFire";).
    User} usuario modelo con las
 *    características del usuario
 *    o null si no ha iniciado
 *    sesión. */
async function muestraSesión(usuario) {
  if (usuario && usuario.email) {
    if (usuario.email == "forms5nv50@gmail.com") {
      // Usuario aceptado.
      const userId = usuario.email;
      // Asigna el rol de ";Admin"; al usuario
      asignarRolAdmin(userId);
    } else {
      // Obtén el ID o correo electrónico del usuario al que deseas asignar el rol
      const userId = usuario.email;
      // Asigna el rol de ";Cliente"; al usuario
      asignarRolCliente(userId);
    }
    forma.email.value = usuario.email || "";
    avatar.src = usuario.photoURL || "";
    forma.terminarSesión.addEventListener("click", terminaSesión);
  } else {
    // No ha iniciado sesión.
    iniciaSesión();
  }
}

function updateUser(user){
  var userNameH1 = document.getElementById("user_name");
  userNameH1.innerHTML = "Hola, " + user.displayName;
}

function loginWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithRedirect(provider);
}

// Maneja el resultado del inicio de sesión
firebase.auth().getRedirectResult().then(function(result) {
    if (result.user) {
        // Actualiza los detalles del usuario aquí
        updateUser(result.user);
    }
  }).catch(function(error) {
    console.error(error);
  });
