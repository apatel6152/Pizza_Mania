import React from 'react';
import styles from '../../styles/Forgotpassword.module.css';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { toast } from 'react-toastify';

const ForgetPassword = () => {
  const [email, setEmail] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `/api/users/forgetpassword`,
        { email },
        config
      );
      toast.success(data.message);
      router.push('/user/login');
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.welcomecontainer}>
          <h1 className={styles.welcome}>Hello users!</h1>
          <p className={styles.para}>
            Enter your email and start resetting your password
          </p>
          <Link href="/user/register">
            <button className={styles.ghost} id="signUp">
              Register
            </button>
          </Link>
        </div>
        <div className={styles.logincontainer}>
          <h1 className={styles.heading1}>Forgot Password?</h1>
          {/* <span className={styles.span}>or use your account</span> */}
          <input
            placeholder="Enter Your Email"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Link href="/user/register">
            <div className={styles.forgotpassword}>
              Dont have an acount? Register
            </div>
          </Link>
          <button className={styles.signinbtn} onClick={handleSubmit}>
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
