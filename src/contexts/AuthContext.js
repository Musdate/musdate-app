import React, { useContext, useEffect, useState } from 'react';
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [ currentUser, setCurrentUser ] = useState()
    const [ loading, setLoading ] = useState(true)

    function singUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    const value = {
        currentUser,
        updatePassword,
        resetPassword,
        updateEmail,
        singUp,
        logout,
        login
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}