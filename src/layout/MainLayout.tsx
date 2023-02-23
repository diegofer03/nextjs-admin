import Header from '@components/Header'
import Nav from '@common/Nav'
import { useAuth } from '@hooks/useAuth'
import { useEffect } from 'react'

export default function MainLayout({ children }: any) {
  const auth = useAuth()

  useEffect(() => {
    auth.fetchUser()
  }, [])
  return (
    <>
      <div className="min-h-full">
        <Header />
        <Nav />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  )
}
