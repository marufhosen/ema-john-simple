import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";

export const initLoginFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
};

export const signUpWithEmailandPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUser = res.user;
      newUser.error = "";
      newUser.success = true;
      updateUserName(name);
      return newUser;
    })
    .catch((error) => {
      // var errorCode = error.code;
      var errorMessage = error.message;
      const newUser = {};
      newUser.error = errorMessage;
      newUser.success = false;
      return newUser;
    });
};

export const signInWithEmailandPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUser = res.user;
      newUser.error = "";
      newUser.success = true;
      return newUser;
    })
    .catch((error) => {
      var errorMessage = error.message;
      const newUser = {};
      newUser.error = errorMessage;
      newUser.success = false;
      return newUser;
    });
};

export const updateUserName = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      // Update successful
      console.log("User Name Update Successfully");
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};
