import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";

const firestore = getFirestore();
const daoUsuario = firestore.collection("Usuario");

export async function iniciaSesión() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: "select_account"});
  await getAuth().signInWithRedirect(provider);
}
/** @param {import("../lib/tiposFire.js").User} usuario
 * @param {string[]} roles
 * @returns {Promise<boolean>} */
export async function tieneRol(usuario, roles) {
  if (usuario && usuario.email) {
    const rolIds = await cargaRoles(usuario.email);
    for (const rol of roles) {
      if (rolIds.has(rol)) {
        return true;
      }
    }
    alert("No autorizado.");
    location.href = "../index.html"; // Asegúrate de actualizar esta línea con la URL real de tu página de inicio de sesión
  } else {
    iniciaSesión();
  }
  return false;
}

export async function terminaSesión() {
  try {
    await getAuth().signOut();
    location.reload(); // Recarga la página para actualizar el estado de inicio de sesión
  } catch (e) {
    muestraError(e);
  }
}

/** @param {string} email
 * @returns {Promise<Set<string>>}
 */
export async function cargaRoles(email) {
  let doc = await daoUsuario.doc(email).get();
  if (doc.exists) {
    const data = doc.data();
    return new Set(data.rolIds || []);
  } else {
    return new Set();
  }
}
