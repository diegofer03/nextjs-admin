
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@hooks/useAuth'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Loading from '@common/Loading'

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const auth = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // setLoading(true)
    const email = emailRef.current?.value
    const pass = passRef.current?.value

    auth
      .signIn(email, pass)
      .then(() => {
        // setLoading(false)
        router.push('/dashboard')
      })
      .catch((error: Error) => {
        console.log(error)
        auth.setError('Invalid Username or Password')
        // setLoading(false)
      })
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              alt="Workflow"
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input defaultValue="true" name="remember" type="hidden" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="sr-only" htmlFor="email-address">
                  Email address
                </label>
                <input
                  ref={emailRef}
                  required
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="email-address"
                  name="email"
                  placeholder="Email address"
                  type="email"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <input
                  ref={passRef}
                  required
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label className="ml-2 block text-sm text-gray-900" htmlFor="remember-me">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a className="font-medium text-indigo-600 hover:text-indigo-500" href="login">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  />
                </span>
                Sign in
              </button>
            </div>

            {auth.error ? (
              <div
                className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                <span className="font-medium">Login Failed!</span> {auth.error}
              </div>
            ) : null}
            {loading ? <Loading /> : null}
          </form>
        </div>
      </div>
    </>
  )
}
