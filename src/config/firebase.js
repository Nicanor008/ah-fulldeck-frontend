import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAqQQj_GUYbnEFApTT64L9c3itO0IZZFeg',
  authDomain: 'fulldeck-app.firebaseapp.com',
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
export const TwitterProvider = new firebase.auth.TwitterAuthProvider();
