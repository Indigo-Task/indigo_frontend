import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {toast} from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECTID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGEID,
  appId: import.meta.env.VITE_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
// BEIKA9zboGri3D5Jtc2WqfnCB7yNzz7NBPF2d3eNekTF0IrUXn9ZskfF91la0dlCSTniBT3YwhBcOhGgGDOAFZE
const messaging = getMessaging(app);
export const getFirebaseToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: "BEIKA9zboGri3D5Jtc2WqfnCB7yNzz7NBPF2d3eNekTF0IrUXn9ZskfF91la0dlCSTniBT3YwhBcOhGgGDOAFZE" })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        return currentToken;
        // Perform any other necessary actions with the token
      } else {
        setTokenFound(false);
        console.log("No registration token available. Request permission to generate one.");
      }
    })
    .catch((err) => {
      console.error("An error occurred while retrieving token. ", err);
    });
};

// Handle incoming messages
onMessage(messaging, (payload) => {
  console.log("Message received: ", payload);
  // Customize notification here
  toast.info(payload.data.message)
});