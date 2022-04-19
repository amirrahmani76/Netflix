import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import '../styles/globals.css';
import { magic } from '../lib/magic-client';
import Loading from '../components/loading/loading';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    if (isLoggedIn) {
      router.push('/');
    } else {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      const handleComplate = () => {
        setIsLoading(false);
      };

      router.events.on('routeChangeComplete', handleComplate);
      router.events.on('routeChangeError', handleComplate);

      return () => {
        router.events.off('routeChangeComplete', handleComplate);
        router.events.off('routeChangeError', handleComplate);
      };
    },
    // when router is updating
    [router]
  );

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
