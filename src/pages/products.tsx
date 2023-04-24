import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetcherGet } from '../../utils/fetcher';

export default function Product(props: any) {
  const [products, setProducts] = useState(props.categories);
  const [editing, setEditing] = useState('');

  useEffect(() => {
    fetcherGet(`products`).then((data) => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      <button
        onClick={() => {
          setEditing('edit');
        }}
      >
        Edit
      </button>
      <button>New</button>
      {/* <table className="table-fixed  border-black border-2 border-solid mx-auto">
        <thead>
          <tr>
            <th>Image</th>
            <th>title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {editing && <Modal />}
          {products?.map((product: any) => (
            <SingleProduct product={product} />
          ))}
        </tbody>
      </table> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product: any) => (
          <div key={product._id} className="bg-white shadow rounded-lg overflow-hidden flex w-full">
            <img src={product.imageUrl} alt={product.title} className="h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-gray-900 font-medium text-xl mb-2">{product.title}</h3>
              <p className="text-gray-600 text-base mb-2">{product.description.short}</p>
              <p className="text-gray-700 font-semibold text-lg">${product.unitPrice}</p>
              <div className="flex">
                <Link href={`/products/${product._id}`}>
                  <div className="mt-4 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:bg-gray-800">View Product</div>
                </Link>
                <button
                  onClick={() => {
                    setEditing('new');
                  }}
                >
                  <div className="mt-4 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:bg-gray-800">edit</div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
