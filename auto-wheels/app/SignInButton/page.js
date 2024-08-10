'use client';

import { signIn } from 'next-auth/react';

export default function SignInButton() {
  return (
    <>
    <button onClick={() => signIn('google', {redirectTo: '/dashboard'})}>
      Sign in with Google
    </button>
    <button onClick={() => signIn('facebook', {redirectTo: '/dashboard'})}>
      Sign in with facebook
    </button>
    </>
  );
}
