import React, { useContext } from 'react';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { Context } from './Context/EduContext';
import Load from './Load';

const Check = () => {
    const { userLoading, user } = useContext(Context);
    console.log()
    return (
        <div>
            {
                userLoading ?
                    <Load></Load> :

                    <RouterProvider router={router} />
            }
        </div>
    );
};

export default Check;