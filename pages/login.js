import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { magic } from '../lib/magic-client';

import styles from '../styles/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

  const handleOnChangeEmail = (e) => {
    setUserMsg('');
    console.log(email);
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();

    if (email) {
      if (email === 'amirrahmani76@gmail.com') {
        // log in a user by their email
        try {
          setIsLoading(true);
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          if (didToken) {
            router.push('/');
          }
        } catch (error) {
          // Handle errors if required!
          console.error('Someting went wrong logging in', error);
          setIsLoading(false);
        }
      } else {
        console.log('Somting went wrong logging in ');
        setIsLoading(false);
      }
    } else {
      // show user message
      setUserMsg('Enter a valid email address');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src={'/static/netflix.svg'}
                alt="Netflix logo"
                width="128px"
                height="34px"
              />
            </div>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            className={styles.emailInput}
            type="text"
            placeholder="Email address"
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
