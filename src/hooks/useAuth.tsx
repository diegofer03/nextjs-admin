import { AuthContext } from '@contexts/AuthContext'
import endPoints from '@services/api'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useCallback, useContext, useState } from 'react'

export const useAuth = () => {
  return useContext(AuthContext)
}

function useProviderAuth() {
  const [user, setUser] = useState<object | null>()
  const [error, setError] = useState<string>()
  const router = useRouter()

  const fetchUser = useCallback(async () => {
    try {
      const token = Cookies.get('token')

      if (token) {
        axios.defaults.headers.Authorization = `Bearer ${token}`
        const { data: user } = await axios.get(endPoints.auth.profile)

        setUser(user)
      }
    } catch (error) {
      setUser(null)
    }
  }, [])

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
      setUser(user)
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(null)
    delete axios.defaults.headers.authorization
    router.push('/')
  }

  return {
    user,
    error,
    setError,
    signIn,
    logout,
    fetchUser
  }
}

export { useProviderAuth }
