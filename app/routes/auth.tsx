import type { l } from 'node_modules/@react-router/dev/dist/routes-CZR-bKRt';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter'

export const meta = () => ([
    {title: 'ResuMentor | Auth'},
    {name: 'description', content: 'Log in to your account'},
])

const Auth = () => {
    // Getting loading state and auth from Puter
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    // To handle redirect if user is logged in
    useEffect(() => {
        if(auth.isAuthenticated) {
            navigate(next);
        }
    }, [auth.isAuthenticated, next])

    return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className='gradient-border shadow-lg'>
            <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
                <div className='flex flex-col items-center gap-2 text-center'>
                    <h1>Welcome</h1>
                    <h2>Log In to Continue Your Dream Job Journey</h2>
                </div>
                {/* Handling logic for displaying login/logout buttons */}
                <div>
                    {/* isLoading is set to true by default */}
                    {isLoading ? (
                        <button className='auth-button animate-pulse'>
                            <p>Signing in...</p>
                        </button>
                    ) : (
                        // Logic for buttons displays depending on authentication status
                        <>
                            {auth.isAuthenticated ? (
                                <button className='auth-button' onClick={auth.signOut}><p>Log Out</p></button>
                            ) : (
                                <button className='auth-button' onClick={auth.signIn}><p>Log In</p></button>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    </main>
  )
}

export default Auth;