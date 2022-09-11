import React, { useState, useEffect } from "react"
import { createContext } from "react"
import { auth } from '../firebase'
//auth object imported from firebase

export const AuthContext = React.createContext()
// createContext is a function used to start a context here the name of the context is AuthContext


export function AuthProvider({ children }) {

    const [user, setuser] = useState('')
    const [loading, setloading] = useState(true)


    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        console.log('logout done');
        return auth.signOut()
    }


    useEffect(() => {
        const usersub = auth.onAuthStateChanged((user) => {
            setuser(user)
            setloading(false)
        })

        return () => {
            usersub()
        }
    }, [])

    const store = {
        user,
        signup,
        login,
        logout,
    }
    return (
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )

}