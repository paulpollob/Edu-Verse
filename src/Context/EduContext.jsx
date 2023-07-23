import { createContext, useState } from 'react';


export const Context = createContext(null);

const EduContext = ({ children }) => {

    const [ leftRoute, setLeftRoute ] = useState(0)

    const value = { leftRoute, setLeftRoute }
    return (

        <Context.Provider value={value}>
            {children}
        </Context.Provider>

    );
};

export default EduContext;