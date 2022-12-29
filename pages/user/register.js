import React from 'react';
import styles from '../../styles/Signup.module.css';
import axios from 'axios';
import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const Register = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();

  const cookies = parseCookies;

  useEffect(() => {
    if (session) {
      toast.success('Login Successfull');
      router.push('/');
    }

    if (cookies?.user) {
      router.push('/');
    }
  }, [router, cookies?.user, session]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (password !== confPassword) {
        toast.error('passwords do not match!');
        // console.log("passwords do not match")
        return;
      }
      const user = cookies?.user
        ? JSON.parse(cookies.user)
        : session?.user
        ? session?.user
        : '';
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:3000/api/users/register',
        {
          email,
          password,
          firstName,
          lastName,
        },
        config
      );
      toast.success(data?.message);
      router.push('/user/login');
    } catch (error) {
      setError(true);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.welcomecontainer}>
          <h1 className={styles.welcome}>Welcome Back!</h1>
          <p className={styles.para}>
            To keep connected with us please login with your personal info
          </p>
          <Link href="/user/login">
            <button className={styles.ghost} id="signUp">
              LOGIN
            </button>
          </Link>
        </div>
        <div className={styles.logincontainer}>
          <h1 className={styles.heading1}>REGISTER</h1>
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
          <span className={styles.span}>
            or use your email for registration
          </span>
          <input
            placeholder="First Name"
            className={styles.input}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last Name"
            className={styles.input}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            placeholder="Email"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Your Password"
            type="password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="Confirm Password"
            type="password"
            className={styles.input}
            onChange={(e) => setConfPassword(e.target.value)}
          />
          <button className={styles.signinbtn} onClick={handleClick}>
            REGISTER
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

export default Register;
