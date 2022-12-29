import Layout from '../components/Layout';
import '../styles/globals.css';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}
