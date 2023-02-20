import { AuthContext } from '@contexts/AuthContext'
import endPoints from '@services/api'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useContext, useState } from 'react'

export const useAuth = () => {
  return useContext(AuthContext)
}

function useProviderAuth() {
  const [user, setUser] = useState<object>()
  const [error, setError] = useState<string>()

  async function signIn(email: string, password: string) {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json'
      }
    }

    const { data: access_token } = await axios.post(
      endPoints.auth.login,
      { email, password },
      options
    )
    if (access_token) {
      const token = access_token.access_token
      Cookies.set('token', token, { expires: 5 })
      axios.defaults.headers.Authorization = `Bearer ${token}`
      const { data: user } = await axios.get(endPoints.auth.profile)
      console.log(user)
      setUser(user)
    }
  }

  return {
    user,
    error,
    setError,
    signIn
  }
}

export { useProviderAuth }
