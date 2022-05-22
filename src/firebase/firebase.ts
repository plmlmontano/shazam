import { initializeApp } from "firebase/app"
import admin from "firebase-admin";
import * as dotenv from "dotenv";
import serviceAccount from './serviceAccountKey.json';
import { ServiceAccount } from "firebase-admin";
dotenv.config();



const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID
};

const app = initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
})


export default { app, admin}