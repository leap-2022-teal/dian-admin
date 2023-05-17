import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Layout from '../../components/layout';
import { UserProvider } from '../../components/userProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
}
