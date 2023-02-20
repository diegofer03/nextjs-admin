import { AuthContext } from '@contexts/AuthContext'
import { useProviderAuth } from '@hooks/useAuth'
import MainLayout from '@layout/MainLayout'
import '@styles/tailwind.css'
import type { AppProps } from 'next/app'

// type AuthProviderProps = {
//   // eslint-disable-next-line no-undef
//   children: JSX.Element
// }

export default function App({ Component, pageProps }: AppProps) {
  const auth = useProviderAuth()

  return (
    <>
      <AuthContext.Provider value={auth}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AuthContext.Provider>
    </>
  )
}
