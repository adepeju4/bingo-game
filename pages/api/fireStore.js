import admin from "firebase-admin";

const key = process.env.PRIVATE_KEY.replace(/\\n/g, '\n')


const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECTID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: key,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTHPROVIDER,
  client_x509_cert_url: process.env.CLIENT_CERT,
};



if (!admin.apps.length) {
  const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://adepeju-bingo-default-rtdb.europe-west1.firebasedatabase.app/",
  });
}


const db = admin.firestore();



export default db;
