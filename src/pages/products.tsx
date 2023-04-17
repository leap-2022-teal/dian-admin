import { useEffect, useState } from 'react';
import Home from '../../components/home';
import { fetcher } from '../../utils/fetcher';

export default function Product(props: any) {
  const [products, setProducts] = useState(props.categories);

  useEffect(() => {
    fetcher(`products`).then((data) => setProducts(data))
  }, []);

  return (
    <Home>
      <div className='grid grid-cols-3'>
        {products?.map((product: any) => (
           <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out w-64 mb-5">
            <img className="w-full object-cover" src={product.imageUrl} alt="Product Image" />
            <div className="p-3">
              <h3 className="text-md font-semibold text-gray-800 mb-1">{product.title}</h3>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-900 text-sm font-bold">{product.unitPrice}₮</span>
              </div>
            </div>
          </div>

        
        ))}
      </div>
    </Home>
  );
}