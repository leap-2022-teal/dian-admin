import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
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
