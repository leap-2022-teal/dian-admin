import { useEffect, useState } from 'react';
import Modal from '../../components/modal';
import SingleProduct from '../../components/singleProducts';
import { fetcherGet } from '../../utils/fetcher';

export default function Product(props: any) {
  const [products, setProducts] = useState(props.categories);
  const [editing, setEditing] = useState('');

  useEffect(() => {
    fetcherGet(`products`).then((data) => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      <button
        onClick={() => {
          setEditing('edit');
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          setEditing('new');
        }}
      >
        New
      </button>
      {editing && <Modal />}
      {products?.map((product: any) => (
        <SingleProduct product={product} />
      ))}
    </div>
  );
}
