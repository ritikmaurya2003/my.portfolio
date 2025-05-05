import { createContext, useContext, useEffect, useState } from 'react'
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { app } from '../firebase/config'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [auth])

  // Sign in with email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Create a new user with email and password
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Sign in with Google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
  }

  // Sign out
  const logout = () => {
    return signOut(auth)
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    signInWithGoogle
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}