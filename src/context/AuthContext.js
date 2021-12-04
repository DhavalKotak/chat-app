import React, { useContext, useState } from 'react'

const AuthContext = React.createContext()
const UpdateAuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const useUpdateAuth = () => {
    return useContext(UpdateAuthContext)
}

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(
        localStorage.getItem("token") !== null
    )
    return(
        <AuthContext.Provider value={isAuth}>
            <UpdateAuthContext.Provider value={setIsAuth}>
                {children}
            </UpdateAuthContext.Provider>
        </AuthContext.Provider>
    )
}