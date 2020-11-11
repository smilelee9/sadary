import { mergeArrayObjectWithKey, mergeObjectWithKey } from '../util/firebaseUtils';

import Auth from './auth'
import { postsRef } from '../firebase'

function createPost(newPost, uid) {
  const post = Object.assign(newPost, {
    uid: uid,
    created_at: new Date().getTime()
  });
  let promise = new Promise((resolve, reject) => {
    try {
      let create = postsRef.push();
      let key = create.key();
      create.set(post, function () {
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

function updatePost(post, post_id) {
  let postRef = postsRef.child(post_id);
  post.created_at = new Date().getTime();

  let promise = new Promise((resolve, reject) => {
    try {
      postRef.update(post, function () {
        post.id = post_id;
        resolve(post);
      });
    }
    catch (e) {
      reject(e.message);
    }
  })
  return promise;
}

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

function getPost(id) {
  let postRef = postsRef.child(id);
  let promise = new Promise((resolve, reject) => {
    try {
      postRef.on('value', function (snapshot) {
        let post = snapshot.val();
        if (post) {
          Auth.getProfile(post.uid).then((profile) => {
            post.user = profile;
            resolve(mergeObjectWithKey(post, id));
          });
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

 
const PostApi = { createPost, deletePost, updatePost, getPost, getPostsList }
export default PostApi