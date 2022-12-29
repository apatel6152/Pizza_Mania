import React from 'react';
import styles from '../../styles/LoginSignup.module.css';
import { SocialIcon } from 'react-social-icons';
import axios from 'axios';
import Link from 'next/link';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const cookies = parseCookies();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      toast.success('LoginSignup Success');
      router.push('/');
    }

    if (cookies?.user) {
      router.push('/');
    }
  }, [router, session, cookies?.user]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:3000/api/users/login',
        {
          email,
          password,
        },
        config
      );
      //   console.log(data);
      toast.success(data.message);
      cookie.set('token', data?.token);
      cookie.set('user', JSON.stringify(data?.user));

      router.push('/');
    } catch (error) {
      toast.error(error.response.data.error);
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.welcomecontainer}>
          <h1 className={styles.welcome}>Hello Friends!</h1>
          <p className={styles.para}>
            Enter your personal details and start journey with us
          </p>
          <Link href="/user/register">
            <button className={styles.ghost} id="signUp">
              Register
            </button>
          </Link>
        </div>
        <div className={styles.logincontainer}>
          <h1 className={styles.heading1}>LOGIN</h1>
          <div className={styles.socialcontainer}>
            <div className={styles.googleIcon} onClick={() => signIn('google')}>
              <SocialIcon
                network="google"
                bgColor="#D1411E"
                fgColor="white"
                style={{ height: 35, width: 35 }}
              />
            </div>
            <div className={styles.googleIcon}>
              <SocialIcon
                network="facebook"
                bgColor="#D1411E"
                fgColor="white"
                style={{ height: 35, width: 35 }}
              />
            </div>
            <div className={styles.googleIcon}>
              <SocialIcon
                network="github"
                bgColor="#D1411E"
                fgColor="white"
                style={{ height: 35, width: 35 }}
              />
            </div>
          </div>
          <span className={styles.span}>or use your account</span>
          <input
            placeholder="Enter Your Email"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Enter Your Password"
            type="password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link href="/user/forgetpassword">
            <div className={styles.forgotpassword}>Forgot your password?</div>
          </Link>
          <button className={styles.signinbtn} onClick={handleClick}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Login;
