import { useEffect, useState } from 'react';
import { fetcherPost, fetcherPostFile, fetcherPut } from '../utils/fetcher';
import AsyncSelect from 'react-select/async';

// 6. description drop

type MyComponentProps = {
  variant: any;
  editingProduct: any;
  handleClose: any;
  products: any;
  categories: any;
  loadProduct: () => void;
  loadCategory: () => void;
};

interface CategoryOption {
  value: string;
  label: string;
}

export default function ProductModal({ variant, editingProduct, handleClose, products, loadProduct, loadCategory, categories }: MyComponentProps) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<any>();
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<CategoryOption>();

  if (variant === 'creating') {
    useEffect(() => {
      setTitle('');
      setPrice(0);
      setBrand('');
      setDescription('');
    }, []);
  }

  if (variant === 'editing') {
    useEffect(() => {
      setTitle(editingProduct?.title);
      setPrice(editingProduct?.unitPrice);
      setBrand(editingProduct?.brand.title);
      setDescription(editingProduct?.description.short);
      setCategoryId({ value: editingProduct?.categoryId, label: editingProduct?.categoryId?.title });
    }, []);
  }

  const categoriesList = categories?.map((category: any) => {
    return { value: category._id, label: category.title };
  });

  const filterCategories = (inputValue: string) => {
    return categories
      ?.map((category: any) => {
        return { value: category._id, label: category.title };
      })
      .filter((i: any) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(filterCategories(inputValue));
      }, 400);
    });

  async function handleFileUpload(event: any) {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile);
    await fetcherPostFile(`upload-image`, formData).then((data: any) => setImage(data));
  }

  function submitPut() {
    fetcherPut(`products/${editingProduct._id}`, { title, price, brand, description, image, categoryId }).then((res: any) => {
      const { status } = res;
      if (status === 200) {
        console.log('success');
        handleClose();
        loadProduct();
      }
    });
  }

  function submitPost() {
    fetcherPost(`products`, { title, price, brand, description, image, categoryId }).then((res: any) => {
      const { status } = res;
      if (status === 200) {
        console.log('success');
        handleClose();
        loadProduct();
      }
    });
  }

  return (
    <>
      {variant === 'editing' ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Бүтээгдэхүүн засах</h3>
                  <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={handleClose}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>

                <div className="m-[2rem] grid grid-cols-2 md:flex-row gap-10">
                  <div>
                    <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                      Барааны нэр
                    </label>
                    <input
                      placeholder="Барааны нэрээ оруулна уу"
                      type="text"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <form className="flex items-center space-x-6">
                    <div className="shrink-0">
                      <img className="h-16 w-16 object-cover rounded-full" src={editingProduct?.imageUrl} alt="" />
                    </div>
                    <label className="block">
                      <input
                        onChange={handleFileUpload}
                        type="file"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                    </label>
                  </form>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Үнэ</label>
                    <input
                      type="text"
                      placeholder="Үнээ оруулна уу"
                      value={price}
                      onChange={(e: any) => setPrice(e.target.value)}
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Бренд</label>
                    <input
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      type="text"
                      placeholder="Брендээ оруулна уу"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                      Ангилал
                    </label>
                    <AsyncSelect value={categoryId} onChange={(val: any) => setCategoryId(val)} cacheOptions defaultOptions={categoriesList} loadOptions={promiseOptions} />
                  </div>
                </div>

                <div className="mx-[2rem] mb-[2rem]">
                  <label className="block mb-2 font-medium text-gray-700">Тайлбар</label>
                  <textarea
                    className="h-[15rem] block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Тайлбараа оруулна уу"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={submitPut}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : variant === 'creating' ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Бүтээгдэхүүн засах</h3>
                  <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={handleClose}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>

                <div className="m-[2rem] grid grid-cols-2 md:flex-row gap-10">
                  <div>
                    <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                      Барааны нэр
                    </label>
                    <input
                      placeholder="Барааны нэрээ оруулна уу"
                      type="text"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <form className="flex items-center space-x-6">
                    <div className="shrink-0">
                      <img className="h-16 w-16 object-cover rounded-full" src={image?.path} alt="" />
                    </div>
                    <label className="block">
                      <input
                        onChange={handleFileUpload}
                        type="file"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                    </label>
                  </form>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Үнэ</label>
                    <input
                      type="text"
                      placeholder="Үнээ оруулна уу"
                      value={price}
                      onChange={(e: any) => setPrice(e.target.value)}
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Бренд</label>
                    <input
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      type="text"
                      placeholder="Брендээ оруулна уу"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                      Ангилал
                    </label>
                    <AsyncSelect value={categoryId} onChange={(val: any) => setCategoryId(val)} cacheOptions defaultOptions={categoriesList} loadOptions={promiseOptions} />
                  </div>
                </div>

                <div className="mx-[2rem] mb-[2rem]">
                  <label className="block mb-2 font-medium text-gray-700">Тайлбар</label>
                  <textarea
                    className="h-[15rem] block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Тайлбараа оруулна уу"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={submitPost}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
