import React, { useState, createContext } from 'react'
export const ContextCategory = createContext()

const Context = ({ children }) => {
    const [Category, setCategory] = useState([]);
    const [Subject, setSubject] = useState([]);
    const [College, setCollege] = useState([]);
    const [School, setSchool] = useState([]);
    const [Hobbies, setHobbies] = useState([]);
    const [Languages, setLanguages] = useState([]);
    const [Role, setRole] = useState("");

    return (
        <ContextCategory.Provider value={{Category, setCategory,Subject, setSubject,College, setCollege,School, setSchool,Hobbies, setHobbies,Languages, setLanguages,Role, setRole}}>
            {children}
        </ContextCategory.Provider>
    )
}

export default Context