import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../firebase/firebase_config';

 export const AuthContext = createContext(null);
 const auth = getAuth(app);
const AuthProvider = ({children}) => {
const [user, setUser] = useState(null);

// create user 
const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
}
// login or sign in
const signIn =(email, password)=>{
  return  signInWithEmailAndPassword(auth, email, password);
}
// sign out
const logOut= () =>{
    return signOut(auth)
}
//  observer user auth state
useEffect(()=>{
    const unsubscribe =  onAuthStateChanged(auth, currentUser=>{
        setUser(currentUser);
      });
    //   stop observing while unmounting
      return () =>{
        return unsubscribe
      }
},[])


    const authInfo = {
        user,
        createUser,
        signIn,
        logOut,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;