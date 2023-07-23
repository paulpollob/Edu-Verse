import { createContext } from 'react';


export const Context = createContext(null);

const EduContext = ({ children }) => {
    const value = { "name": "krishna" }
    return (

        <Context.Provider value={value}>
            {children}
        </Context.Provider>

    );
};

export default EduContext;