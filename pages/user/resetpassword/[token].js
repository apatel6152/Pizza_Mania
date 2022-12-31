import React from 'react';
import styles from '../../../styles/Resetpassword.module.css';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState(null);
  const [conNewPassword, setConNewPassword] = useState(null);
  const router = useRouter();

  const { token } = router.query;

  console.log(token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(
        `/api/users/resetpassword/${token}`,
        { conNewPassword, newPassword },
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
          <h1 className={styles.heading1}>Reset Password</h1>
          {/* <span className={styles.span}>or use your account</span> */}
          <input
            placeholder="New Password"
            className={styles.input}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            placeholder="Confirm New Password"
            className={styles.input}
            onChange={(e) => setConNewPassword(e.target.value)}
          />
          <button className={styles.signinbtn} onClick={handleSubmit}>
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
