import { mergeArrayObjectWithKey, mergeObjectWithKey } from '../util/firebaseUtils'

// import { auth, usersRef } from '../firebase'
// 하드코드로 테스트
import mockData from '../common/mockData.json'

// function register(email, password, profile = {}) {
//   let context = {}; // store에서 불러오든지 해야함
//   let promise = new Promise(function (resolve, reject) {
//     usersRef.createUser({ email, password }, function (err, user) {
//       if (err) {
//         reject(err.message);
//       }
//       else {
//         context.updateProfile(profile, user.uid).then((profile) => {
//           resolve({ email, password });
//         });
//       }
//     });
//   });
//   return promise;
// }

function register(email, password, profile = {}) {
  let promise = new Promise(function (resolve, reject) {
    console.log('email: ', email)
    console.log('password: ', password)
    resolve({ email, password, ...profile })
  });
  return promise;
}


function cleanUser(user) {
  return {
    email: user.password.email,
    token: user.token,
    uid: user.uid
  }
}

// function login(email, password) {
//   let promise = new Promise(function (resolve, reject) {
//     auth.signInWithEmailAndPassword(email, password)
//       .then(resolve(cleanUser(user)))
//       .catch((err) => reject(err.message))

//     return promise;
//   });
// }

function login(email, password) {
  let promise = new Promise(function (resolve, reject) {
    let users = mergeArrayObjectWithKey(mockData.users)
    let user = users.find(user => user.email === email)
    if (user) resolve(user)
    else reject("No such user")
  })
  return promise;
}


// function isAuthenticated() {
//   let user = auth.getAuth();
//   let promise = new Promise(function (resolve, reject) {
//     if (user) {
//       resolve(cleanUser(user));
//     }
//     else reject('not auth token');
//   });
//   return promise;
// }

function isAuthenticated() {
  let promise = new Promise(function (resolve, reject) {
    reject('not auth token');
  });
  return promise;
}


// function logout() {
//   return new Promise(function (resolve, reject) {
//     auth.signOut();
//     resolve();
//   })
// }

function logout() {
  return new Promise(function (resolve, reject) {
    resolve();
  })
}


// function updateProfile(profile = {}, uid) {
//   let userProfile = usersRef.child(uid);
//   let promise = new Promise(function (resolve, reject) {
//     userProfile.set(profile, function (err) {
//       if (err) {
//         reject(err);
//       }
//       else {
//         resolve(profile);
//       }
//     });
//   });
//   return promise;
// }

function updateProfile(profile = {}, uid) {
  let userProfile = mockData.users[uid];
  let promise = new Promise(function (resolve, reject) {
    console.log(userProfile, profile)
    // userProfile = profile
    resolve(profile)
  });
  return promise;
}


// function getProfile(uid) {
//   let userProfile = usersRef.child(uid);
//   let promise = new Promise(function (resolve, reject) {
//     userProfile.on("value", (snapshot) => {
//       let profile = snapshot.val();
//       resolve(profile);
//     }, (error) => {
//       reject(error);
//     });
//   });
//   return promise;
// }


function getProfile(uid) {
  let userProfile = mockData.users[uid];
  let promise = new Promise(function (resolve, reject) {
    if (userProfile) resolve(userProfile)
    else reject("No such user")
  });
  return promise;
}

const Auth = { register, cleanUser, login, isAuthenticated, logout, updateProfile, getProfile }
export default Auth

// export { getProfile }