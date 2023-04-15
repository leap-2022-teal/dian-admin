import { useEffect, useState } from 'react';
import { fetcher } from '../utils/fetcher';

export function Product(props: any) {
  const [products, setProducts] = useState(props.categories);

  useEffect(() => {
    fetcher(`products`).then((data) => setProducts(data));
  }, []);

  return (
    <>
      <div>
        {products?.map((product: any) => (
          <div key={product._id}>{product.title}</div>
        ))}
      </div>
    </>
  );
}
