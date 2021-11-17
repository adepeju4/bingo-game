import admin from "firebase-admin";
import serviceAccount from "../../servicekey.json";


if (!admin.apps.length) {
  const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://adepeju-bingo-default-rtdb.europe-west1.firebasedatabase.app/",
  });
}


const db = admin.firestore();



export default db;
