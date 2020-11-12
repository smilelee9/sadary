import { mergeArrayObjectWithKey, mergeObjectWithKey } from '../util/firebaseUtils';

import Auth from './auth'
import mockData from '../common/mockData.json'
import { postsRef } from '../firebase'

// async function createPost(newPost, uid) {
//   await sleep(100)
//   const post = Object.assign(newPost, {
//     uid: uid,
//     created_at: new Date().getTime()
//   });
//   let promise = new Promise((resolve, reject) => {
//     try {
//       resolve(post)
//     }
//     catch (e) {
//       reject(e.message);
//     }
//   })
//   return promise;
// }


function createPost(newPost, uid) {
  const post = Object.assign(newPost, {
    uid: uid,
    createdTime: new Date().getTime(),
    curMember: [uid]
  });
  let promise = new Promise((resolve, reject) => {
    try {
      let create = postsRef.push();
      let key = create.key;
      create.update(post, function () {
        post.id = key;
        resolve(post);
      });
    }
    catch (e) {
      reject(e.message);
    }
  })
  return promise;
}

async function updatePost(post, post_id) {
  post.created_at = new Date().getTime();
  await sleep(200);
  let promise = new Promise((resolve, reject) => {
    try {
      post.id = post_id;
      resolve(post);
    }
    catch (e) {
      reject(e.message);
    }
  })
  return promise;
}

// function updatePost(post, post_id) {
//   let postRef = postsRef.child(post_id);
//   post.created_at = new Date().getTime();

//   let promise = new Promise((resolve, reject) => {
//     try {
//       postRef.update(post, function () {
//         post.id = post_id;
//         resolve(post);
//       });
//     }
//     catch (e) {
//       reject(e.message);
//     }
//   })
//   return promise;
// }

const sleep = n => new Promise(resolve => setTimeout(resolve, n));

function getPostsList() {
  let promise = new Promise((resolve, reject) => {
    try {
      postsRef.on('value', function (snapshot) {
        let posts = mergeArrayObjectWithKey(snapshot.val());
        for (let index = 0; index < posts.length; index++) {
          const post = posts[index];
          Auth.getProfile(post.uid).then((profile) => {
            post.user = profile
          })
        }
        resolve(posts.reverse())
      });
    }
    catch (err) {
      reject(err.message);
    }
  });
  return promise;
}

function getPostView(id) {
  // TODO 여기서 comments도 같이 로드할것.
  let postRef = postsRef.child(id);
  let promise = new Promise((resolve, reject) => {
    try {
      postRef.on('value', function (snapshot) {
        let post = snapshot.val();
        if (post) {
          resolve(mergeObjectWithKey(post, id));

          // Auth.getProfile(post.uid).then((profile) => {
          //   post.user = profile;
          //   resolve(mergeObjectWithKey(post, id));
          // });
        }
        else {
          reject('Post\'s not exists');
        }
      });
    }
    catch (e) {
      reject(e.message);
    }
  });
  return promise;
}

// async function deletePost(id) {
//   await sleep(100)
//   return new Promise((resolve, reject) => {
//     resolve('Post was deleted');
//   })
// }

function deletePost(id) {
  let postRef = postsRef.child(id);
  return new Promise((resolve, reject) => {
    postRef.remove((err) => {
      if (err) {
        reject(err.message);
      }
      else resolve('Post was deleted');
    });
  })
}


const PostApi = { createPost, deletePost, updatePost, getPostView, getPostsList }
export default PostApi