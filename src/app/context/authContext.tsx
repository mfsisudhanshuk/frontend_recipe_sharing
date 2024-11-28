'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut, User as FirebaseUser } from 'firebase/auth'
import { loginUser, registerUser } from '@/lib/authService'
import { auth } from '@/lib/fireStoreConfig'
import { User } from '../components/CommentRecipe'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (name: string, email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

export const clearAuthStorage = () => {
  // Clear localStorage
  localStorage.removeItem('user')
  localStorage.removeItem('token')

  // Clear sessionStorage
  sessionStorage.removeItem('user')
  sessionStorage.removeItem('token')

  // Clear cookies
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}



const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      setLoading(true)
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          name: firebaseUser.displayName!,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const result = await loginUser({ email, password })
      if (result.error) {
        return { error: result.error }
      }
      // The user state will be updated by the onAuthStateChanged listener
      return {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { error: 'Failed to sign in' }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setLoading(true)
      const result = await registerUser({ name, email, password })
      if (result.error) {
        return { error: result.error }
      }
      // The user state will be updated by the onAuthStateChanged listener
      return {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { error: 'Failed to create account' }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      await firebaseSignOut(auth)
      clearAuthStorage();
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
