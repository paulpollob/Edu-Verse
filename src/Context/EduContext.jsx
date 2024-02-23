import { createContext, useEffect, useState } from 'react';
import fapp from '../Firebase/FirebaseAuth';
const auth = getAuth(fapp);
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";

export const Context = createContext(null);


const uploadImg = (img) => { 
    const formData = new FormData();
    formData.append('image', img);
    return fetch("https://api.imgbb.com/1/upload?key=e1908c42ce047aa360fb1935d07ff103",
        {
            method: 'POST',
            body: formData
        })
}


const signUp = (email, password) => { 
    return createUserWithEmailAndPassword(auth, email, password)
}

const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}










const EduContext = ({ children }) => {

    const [leftRoute, setLeftRoute] = useState(0)
    const [tcLeftRoute, setTcLeftRoute] = useState(0)
    const [teacherID, setTeacherID] = useState("")
    const [user, setUser] = useState({})
    const [userLoading, setUserLoading] = useState(false)
    const [update, setUpdate] = useState(false)



    const logOut = ()=>{
        setUser({})
        return signOut(auth) 
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                const cllctn = user.displayName 

                fetch('http://localhost:5000/getUserInfo',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            "_id": uid,
                            "cllctn": cllctn
                        }
                    )
                })
                .then(res => res.json())
                .then((data) => { setTeacherID(data?._id); setUser(data);  console.log("HK user updated: ", user)})
                .catch((error) => console.log("Error:", error)); 
            } else {
                // setUser({})
                logOut() 
                // alert("HK no user") 
            }
        });

        return () => { return unsubscribe() }
    }, [update])

    useEffect(()=>
    {
        (user.email==null) ? setUserLoading(false):setUserLoading(true)
    },[user])



    const value = { leftRoute, setLeftRoute, tcLeftRoute, setTcLeftRoute, teacherID, setTeacherID, signUp, logIn, logOut, user, setUser, uploadImg, updateProfile, userLoading, setUserLoading, update, setUpdate }
    return (

        <Context.Provider value={value}>
            <div className=' bg-blur-md bg-gradient-to-r from-purple-200 to-blue-100 text-slate-700'>{children}</div>
        </Context.Provider>

    );
};

export default EduContext;