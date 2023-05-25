import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../../components/layout';

export default function Main() {
  const router = useRouter();
  useEffect(() => {
    router.push(`/products`);
  }, []);
  return <Layout>Main</Layout>;
}
