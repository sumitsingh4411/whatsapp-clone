import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyA0TE4sPINmyFjX7y0o_YY870GC9prqmM0",
    authDomain: "whatapp-c85ce.firebaseapp.com",
    projectId: "whatapp-c85ce",
    storageBucket: "whatapp-c85ce.appspot.com",
    messagingSenderId: "867564879426",
    appId: "1:867564879426:web:53a8d25e9b6c977c6cb7db"
  };
  const fire=firebase.initializeApp(firebaseConfig);
  const db=fire.firestore();
  const auth=fire.auth();
  const provider=new firebase.auth.GoogleAuthProvider();
  export {auth,provider};
  export default db;
