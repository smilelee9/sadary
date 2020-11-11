const firebase = require('firebase')
const firebaseConfig = {
  apiKey: "AIzaSyDs8MuNOIEDslsm5swysD6zG4sy9cKRe-o",
  authDomain: "sadary-204af.firebaseapp.com",
  databaseURL: "https://sadary-204af.firebaseio.com",
  projectId: "sadary-204af",
  storageBucket: "sadary-204af.appspot.com",
  messagingSenderId: "700734874935",
  appId: "1:700734874935:web:faae8dbb6209678b9ea6b2",
  measurementId: "G-958V9PBM6L"
};

// firebase.initializeApp(firebaseConfig);

firebase.default.initializeApp(firebaseConfig);


// if (firebase.apps && !firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
export var auth = firebase.default.auth();

// Get a reference to the database service
var database = firebase.default.database();
const databaseRef = database.ref();
export const postsRef = databaseRef.child("posts")
export const usersRef = databaseRef.child("users")

