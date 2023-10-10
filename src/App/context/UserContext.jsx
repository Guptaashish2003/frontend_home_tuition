import React, { useState, createContext } from 'react'
export const ContextUser = createContext()

const UserContext = ({ children }) => {
    const [user, setUser] = useState([]);
    const [userRef, setUserRef] = useState();


    return (
        <ContextUser.Provider value={{user,setUser,userRef, setUserRef}}>
            {children}
        </ContextUser.Provider>
    )
}

export default UserContext