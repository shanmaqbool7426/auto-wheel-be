'use client';

import { signIn, useSession, SessionProvider } from 'next-auth/react';

export default function SignInButton() {
  return (
    <SessionProvider>
      <InnerSignInButton />
    </SessionProvider>
  );
}

function InnerSignInButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!session ? (
        <>
          <button onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
            Sign in with Google
          </button>
          <button onClick={() => signIn('facebook', { callbackUrl: '/dashboard' })}>
            Sign in with Facebook
          </button>
        </>
      ) : (
        <div>
          <p>Welcome, {session.user.name}!</p>
          <p>Email: {session.user.email}</p>
        </div>
      )}
    </>
  );
}
