import { createContext, useState, useEffect } from 'react'
import DjangoPortalService from '../services/django_portal_service';
import jwt_decode from 'jwt-decode'
import { useHistory } from 'react-router-dom'

import Config from "../services/config_HOME.json";

const _API_BASE = Config.django_portal_API_BASE

const AuthContext = createContext()
const djangoPortalService = new DjangoPortalService()

export default AuthContext

export const AuthProvider = ({children}) => {

    // localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')).username : null)

    const history = useHistory()

    const djangoLoginUser = async (e) => {
        e.preventDefault()
        let res = await fetch(`${_API_BASE}token/`,{
          method: 'POST',
          headers: {
            'content-Type': 'application/json'
          },
          body: JSON.stringify({
            'username': e.target.username.value,
            'password': e.target.password.value,
          })
        })
        let data = await res.json()
        if (res.status === 200) {
          setAuthTokens(data)
          setUser(jwt_decode(data.access).username)
          localStorage.setItem('authTokens', JSON.stringify(data))
          history.push('/')
        }
        else {
          alert('Что-то не так с авторизацией')
        }
      }

    let djangoLogoutUser = async () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }   

    let contextData = {
        user: user,
        djangoLoginUser: djangoLoginUser,
        djangoLogoutUser: djangoLogoutUser
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}