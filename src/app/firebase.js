import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4KPcV5gwpvOmbVmVEBGmkGWXHrB0i2oA",
  authDomain: "crud-operation-nextjs.firebaseapp.com",
  projectId: "crud-operation-nextjs",
  storageBucket: "crud-operation-nextjs.appspot.com",
  messagingSenderId: "767230146561",
  appId: "1:767230146561:web:b0ab246b665b0d6ec02800",
  measurementId: "G-S3QECK7F68",
};

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
