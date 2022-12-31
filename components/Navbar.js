import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { parseCookies } from 'nookies';
import cookie from "js-cookie"
import { useSession, signOut } from "next-auth/react"

const Navbar = () => {

  const [userState, setUserState] = useState("")
  const [isLoggedIn, setisLoggedIn] = useState(false)

  const { data: session } = useSession()
  // console.log(session);
  const cookies = parseCookies();

  const router = useRouter()
  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

  const quantity = useSelector((state) => state.cart.quantity);

  useEffect(() => {
    session ? setUserState(session.user) : setUserState(user)
    if (user) {
      setisLoggedIn(true);
      setUserState(user);
    }
    // if (user) {
    //   dispatch(loadUser(user.email, user))
    // }
  }, [session, setUserState, setisLoggedIn, user])

  // useEffect(() => {
  //   if (user) {
  //     setisLoggedIn(true);
  //     setUserState(user);
  //   }
    
  //   // if (!user) {
  //   //   router.push("/users/login")
  //   // }
  // }, [setisLoggedIn])

  const logoutHandler = async () => {
    if (session) {
      signOut()
    }
    cookie.remove("token")
    cookie.remove("user")
    setisLoggedIn(false)
    setUserState("")
  }
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/logo.png" alt="" width="160" height="69" />
      </div>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>

      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>Home</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          {/* <Image src="/img/logo.png" alt="" width="160" height="69" /> */}
          {/* <li className={styles.listItem}>Blog</li> */}
          <li className={styles.listItem}>Contact</li>
          {/* {userState ? (
              <>
                <Button color="inherit" onClick={logoutHandler}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="user/login">
                  <Button color="inherit">Login</Button>
                </Link>
                <Link href="/src/user/register">
                  <Button color="inherit">Register</Button>
                </Link>
              </>
            )} */}
          {userState ? (
            <Link href="/user/login" passHref>
              <li className={styles.listItem} onClick={logoutHandler}>LogOut</li>
            </Link>
          ) : (
            <Link href="/user/login" passHref>
              <li className={styles.listItem} onClick={logoutHandler}>Login</li>
            </Link>
          )}
        </ul>
      </div>

      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30" height="30" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
