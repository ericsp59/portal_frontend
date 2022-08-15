import './login.css'
import React, {useContext} from 'react'
import AuthContext from '../../red/auth-context'

const Login = () => {

    let {djangoLoginUser, user} = useContext(AuthContext)
    return(
        <>
            <h1>Login page</h1>
            <h2>{user}</h2>
            <form action="" method="post" onSubmit={djangoLoginUser}>
                <input type="text" name="username" id="" placeholder='Введите имя'/>
                <input type="text" name="password" id="" placeholder='Введите пароль'/>
                <input type="submit"/>
            </form>
        </>
    )
}

export default Login