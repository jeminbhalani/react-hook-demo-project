import {
  createContext,
  useState,
} from 'react'
export const AuthContext = createContext(
  undefined,
)

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(false);

  const value = {
    authData, setAuthData
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}