import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    
    const location = useLocation();
    if(location.state) return children 
    return <Navigate to={'/tc/classroom'} ></Navigate>
    return (
        <div>
            Hare Krishna from private route 
        </div>
    );
};

export default PrivateRoute;