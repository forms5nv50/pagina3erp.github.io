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
    userNameH1.innerHTML = "Hola Angel Hernandez Martinez! ¿Qué deseas comprar hoy?";
  } else {
  userNameH1.innerHTML = "Hola " + usuario.displayName + "! ¿Qué deseas comprar hoy?";
  }
}

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(result => {
    // Esto te permite acceder al token de acceso directamente si necesitas.
    const token = result.credential.accessToken;

    // El usuario está autenticado, puedes acceder a los datos del usuario.
    const usuario = result.user;
    // Actualiza los detalles del usuario aquí
    updateUser(usuario)

  }).catch((error) => {
    // Maneja los errores aquí.
    const errorCode = error.code;
    const errorMessage = error.message;
    // El correo electrónico de la cuenta del usuario utilizado.
    const email = error.email;
    // El tipo firebase.auth.AuthCredential que fue utilizado.
    const credential = error.credential;
  });
}

function loginWithGoogle() {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  })
  .then(result => {
    // Aquí puedes acceder al token de acceso directamente si es necesario.
    var token = result.credential.accessToken;
  
    // El usuario está autenticado, puedes acceder a la información del usuario.
    const usuario = result.user;
    // Actualiza los detalles del usuario aquí
    updateUser(usuario)
  })
  .catch((error) => {
    // Aquí manejas los errores.
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
  });
}

function loginFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        updateUser(user, true);
    }).catch(function(error) {
        console.error(error);
    });
}

document.getElementById('signInButtonG').addEventListener('click', loginWithGoogle);
document.getElementById('signInButtonFb').addEventListener('click', loginWithGoogle);
