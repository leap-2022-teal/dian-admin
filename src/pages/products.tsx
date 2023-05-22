import { useEffect, useState } from 'react';
import { fetcherDelete, fetcherGet } from '../../utils/fetcher';
import ProductModal from '../../components/productModal';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import axios from 'axios';
import Pagination from '../../components/pagination';
import Layout from '../../components/layout';

export default function Product() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [variant, setVariant] = useState('');
  const [editingProduct, setEditingProduct] = useState<any>();
  const [categories, setCategories] = useState();
  // const [search, setSearch] = useState(''); // Search filter

  // useEffect(() => {
  //   router.push(`/products?search=${search}`);
  // }, [search]);

  const { search } = router.query;

  useEffect(() => {
    axios.get(`http://localhost:8000/products?searchQuery=${search}`).then((res) => setProducts(res.data));
  }, [search]);
  const [limit] = useState(15);
  const [totalProducts, setTotalProducts] = useState(0);
  let { page }: any = router.query;
  const skeleton: any = [];

  const indexOfLastPost = page * limit;
  const indexOfFirstPost = indexOfLastPost - limit;

  useEffect(() => {
    fetcherGet(`products`).then((data) => {
      setTotalProducts(data.length);
    });
  }, [loadProduct]);

  useEffect(() => {
    if (router.isReady) {
      fetcherGet(`products/pagination?page=${page ?? 1}&limit=${limit}`).then((data) => {
        setProducts(data);
      });
    }
  }, [page]);

  function loadProduct() {
    fetcherGet(`products/pagination?page=${page}&limit=${limit}`).then((data) => {
      setProducts(data);
    });
  }

  function previousPage() {
    if (page !== 1) {
      page = page - 1;
    }
  }

  function nextPage() {
    if (page !== Math.floor(totalProducts / limit)) {
      page = page - 1;
    }
  }

  useEffect(() => {
    fetcherGet(`categories`).then((data: any) => setCategories(data));
  }, []);

  function loadCategory() {
    fetcherGet(`categories`).then((data: any) => setCategories(data));
  }

  function handleEdit(e: string) {
    console.log(products);
    const productFilter = products.filter((product: any) => {
      if (product._id === e) {
        return product;
      }
    });

    setEditingProduct(productFilter[0]);
    setVariant('editing');
  }

  function handleCreate() {
    setVariant('creating');
  }

  function handleDelete(e: string) {
    if (window.confirm('Устгах уу')) {
      fetcherDelete(`products/${e}`).then((res) => {
        const { status } = res;
        if (status === 200) {
          router.push('/products');
          loadProduct();
        }
      });
    }
  }

  function handleClick(e: any) {
    setIsOpen(true);
  }

  function handleClose() {
    setVariant('');
    setEditingProduct('');
  }

  for (let i = 0; i < 20; i++) {
    skeleton.push(
      <tr className="">
        <td>
          <div className="h-2.5  bg-gray-300 rounded-full dark:bg-gray-600 w-32 mb-8"></div>
        </td>
        <td>
          <div className="h-2.5  bg-gray-300 rounded-full dark:bg-gray-600 w-64 mb-8"></div>
        </td>
        <td>
          <div className="h-2.5  bg-gray-300 rounded-full dark:bg-gray-600 w-64 mb-8"></div>
        </td>
        <td>
          <div className="h-2.5  bg-gray-300 rounded-full dark:bg-gray-600 w-64 mb-8"></div>
        </td>
        <td>
          <div className="h-2.5  bg-gray-300 rounded-full dark:bg-gray-600 w-32 mb-8"></div>
        </td>
      </tr>
    );
  }

  return (
    <Layout>
      <div className="m-[2rem]">
        <button
          onClick={handleCreate}
          className=" my-5 px-3 py-2 font-normal leading-5 text-white transition-colors duration-150 bg-purple-500  border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Бүтээгдэхүүн нэмэх
        </button>

        {/* <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        /> */}

        {variant && (
          <ProductModal categories={categories} loadCategory={loadCategory} loadProduct={loadProduct} variant={variant} editingProduct={editingProduct} handleClose={handleClose} products={products} />
        )}

        <div className="w-fulloverflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead className="">
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  bg-gray-50">
                  <th className="px-4 py-3">Products</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Brand</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              {!products || products.length < 1 ? (
                <tbody
                  role="status"
                  className="h-[100%] w-[100%] p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                >
                  {skeleton}
                </tbody>
              ) : (
                <tbody className="bg-white divide-y">
                  {products?.map((product: any) => (
                    <tr key={product._id} className="text-gray-700 ">
                      <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                          <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src={product.imageUrl} alt={product.title} loading="lazy" />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div>
                          <p onClick={() => handleClick(product._id)} className="font-semibold">
                            {product.title}
                          </p>
                        </div>
                        {isOpen && <div className="mt-4">{product.description.short}</div>}
                      </td>
                      <td className="px-4 py-3 text-sm">{numeral(product.unitPrice).format('0,0.00')}₮</td>
                      <td className="px-4 py-3 text-sm">{product.categoryId?.title}</td>
                      <td className="px-4 py-3 text-sm">{product.brand.title}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-4 text-sm">
                          <button
                            onClick={() => handleEdit(product._id)}
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                            aria-label="Edit"
                          >
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                            aria-label="Delete"
                          >
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            <Pagination
              limit={limit}
              totalProducts={totalProducts}
              indexOfLastPost={indexOfLastPost}
              indexOfFirstPost={indexOfFirstPost}
              previousPage={previousPage}
              nextPage={nextPage}
              currentPage={page}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
