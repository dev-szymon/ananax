import * as admin from 'firebase-admin';

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      }),
    });
  }
} catch (err) {
  console.log(err);
}

const db = admin.firestore();
const auth = admin.auth();
const { FieldPath } = admin.firestore;
export { db, auth, FieldPath };
