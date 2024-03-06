import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Context } from '../../Context/EduContext';
import Load from '../../Load';

const PrivateRoute = ({children}) => {
    // return  

    const { user,userLoading } = useContext(Context);
    
    const location = useLocation();

    if(userLoading) <Load></Load>
        
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
    return (
        <div>
            {
            userLoading?
            <Load></Load>:
            <Navigate to={'/login'} ></Navigate> 
        }
        </div>
    )

};

export default PrivateRoute;