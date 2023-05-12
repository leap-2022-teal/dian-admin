import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../../components/layout';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from '../../components/userProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
