import firebase from 'firebase';
import * as admin from 'firebase-admin';

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tweet-webapp-4b0f3-default-rtdb.firebaseio.com"
});

export default app;