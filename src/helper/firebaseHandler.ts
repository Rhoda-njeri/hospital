
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



import {setFireDb} from "@/utils/constants";
import {getDatabase} from "firebase/database";
import {initializeApp} from "firebase/app";

export function setupApp(): void {
    const firebaseConfig = {
        apiKey: "AIzaSyCkMLX9t1LwM4bw0HJUJ2e4ijYqb8LpG2g",
        authDomain: "hospital-system-9e9ee.firebaseapp.com",
        projectId: "hospital-system-9e9ee",
        storageBucket: "hospital-system-9e9ee.appspot.com",
        messagingSenderId: "897554828011",
        appId: "1:897554828011:web:84219ca439b9118c410cae",
        measurementId: "G-4J22E8T167"
      };
  setFireDb(getDatabase(initializeApp(firebaseConfig)));
}