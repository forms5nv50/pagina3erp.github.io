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
 * @param {import("../lib/tiposFire").User} usuario 
 * modelo con las características del usuario
 * o null si no ha iniciado sesión. 
 */
async function muestraSesión(usuario) {
  if (usuario && usuario.email) {
    if (usuario.email == "forms5nv50@gmail.com") {
      const userId = usuario.email;
      asignarRolAdmin(userId);
    } else {
      const userId = usuario.email;
      asignarRolCliente(userId);
    }
    avatar.src = usuario.photoURL || "";
    forma.terminarSesión.addEventListener("click", terminaSesión);
  } else {
    loginWithGoogle();
  }
}

function updateUser(usuario){
  var userNameH1 = document.getElementById("user_name");
  if (usuario.email == "forms5nv50@gmail.com") {
    userNameH1.innerHTML = "Hola Angel Hernandez Martinez! Qué deseas comprar hoy?";
  } else {
  userNameH1.innerHTML = "Hola " + usuario.displayName + "! Qué deseas comprar hoy?";
  }
}

function loginWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
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

forma.terminarSesión.addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    // Actualiza la interfaz de usuario para un usuario desconectado.
    muestraSesión(null);
  }).catch((error) => {
    // Ha ocurrido un error, haz algo aquí.
    console.error(error);
  });
});
