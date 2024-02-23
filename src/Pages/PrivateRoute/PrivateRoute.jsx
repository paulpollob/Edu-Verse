import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Context } from '../../Context/EduContext';

const PrivateRoute = ({children}) => {

    const { user,userLoading } = useContext(Context);
    
    const location = useLocation();
    console.log("HK ", location, user)
    if(user.email==null) return <Navigate to={'/login'} ></Navigate> 
    if(!(user.email==null) && location.pathname.includes('classroom/home') && !(location.state==null)) { console.log("HK from clas");return children}
    if(user.occupation == "Teacher") 
    {
        if(location.pathname.includes('tc')) return children
        else return <Navigate to={'/tc'} ></Navigate> 
    }
    if(user.occupation == "Student" )
    {
        if(location.pathname.includes('st')) return children
        else return <Navigate to={'/st'} ></Navigate> 
    }
    return <Navigate to={'/login'} ></Navigate> 

};

export default PrivateRoute;