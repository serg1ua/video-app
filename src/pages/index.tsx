import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { Button, Navbar } from '~/Components';

import { api } from '~/utils/api';

export default function Home(props) {
  const hello = api.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <>
      <Head>
        <title>VideoArea</title>
        <meta name='description' content='Videos' />
        <link rel='icon' href='/video-app.svg' />
      </Head>
      <Navbar />
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <p className='text-center text-2xl text-white'>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </Button>
    </div>
  );
}
