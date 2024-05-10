import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()

    // create user with email and password
    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login user with email and password
    const signInUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // github login
    const githubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider)
    }

    // log out
    const logOut = ()=>{
        setUser(null)
        signOut(auth)
        .then(()=>{
            console.log(user.email, 'signed out successfully');
            toast.success('You are logged out.')
        })
    }

    // observer
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser(user)
            }
            setLoading(false)
        })
        return ()=> unSubscribe()
    }, [])
    
    const authInfo = {
        user,
        createUser,
        signInUser,
        googleLogin,
        githubLogin,
        logOut,
        loading,
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;