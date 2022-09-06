import { Navigate} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import userContext from '../UserContext';

export default function SignOut(){
    
    const {setUser, unsetUser} = useContext(userContext);

    unsetUser();

    useEffect(() => {
        setUser({
            token: null
        })
    })


    return(
        <Navigate to="/signIn" />
    )
};