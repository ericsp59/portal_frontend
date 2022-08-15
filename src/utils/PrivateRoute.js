import { Route, Redirect } from "react-router-dom";
import {  useContext } from 'react'
import AuthContext from "../red/auth-context";



const  PrivateRoute = ({children, ...rest}) => {

    let {user} = useContext(AuthContext)
    console.log(user)
    
    return(
        <Route {...rest}>{!user ? <Redirect to='/login'/> : children}</Route>
    )
}

export default PrivateRoute