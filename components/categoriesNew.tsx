import { useEffect, useState } from 'react';
import { fetcherGet, fetcherPost } from '../utils/fetcher';
import React from 'react';
import CreatableSelect from 'react-select/creatable';

export function CategoriesNew({ loadCategory, categories }: any) {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [subCategories, setSubCategories] = useState<any>();
  const [category, setCategory] = useState('');

  // useEffect(() => {
  //   fetcherGet(`categories/subCategory`).then((data) => setSubCategories(data));
  // }, []);

  const categoriesList = categories?.map((category: any) => {
    return { value: category._id, label: category.title };
  });

  const handleCancelClick = () => {
    setIsVisible(false);
    setTitle('');
  };

  const handleSaveClick = () => {
    fetcherPost(`categories`, { title }).then((res) => {
      const { status } = res;
      if (status === 200) {
        setIsVisible(false);
        setTitle('');
        loadCategory();
      }
    });
  };

  return (
    <>
      <button
        className=" my-5 px-3 py-2 font-normal leading-5 text-white transition-colors duration-150 bg-purple-500  border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        onClick={() => setIsVisible(true)}
      >
        Ангилал нэмэх
      </button>
      {isVisible && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Ангилал нэмэх</h3>
                </div>

                <div className="m-[1rem] p-[1rem] grid grid-cols-1 gap-10">
                  <div>
                    <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                      Ангилал
                    </label>
                    <CreatableSelect isClearable options={categoriesList} value={title} onChange={(value: any) => setTitle(value)} />
                    {/* <input
                      placeholder=" Ангилалын нэрээ оруулна уу"
                      type="text"
                      name="title"
                      value={title}
                      className="block w-full py-2 px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={(e) => setTitle(e.target.value)}
                    /> */}
                  </div>

                  <div>
                    <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                      Дэд ангилал
                    </label>
                    <input
                      value={subCategories}
                      onChange={(e) => setSubCategories(e.target.value)}
                      placeholder="  Дэд ангилалын нэрээ оруулна уу"
                      type="text"
                      name="title"
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* <div className="w-full  p-8 items-center bg-white rounded-2xl shadow-xl overflow-hidden sm:max-w-4xl hover:shadow-xl dark:bg-gray-500">
                  <form action="#">
                    <div className="mb-2">
                      <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                        Дэд Ангилал
                      </label>
                      <AsyncSelect value={subCategories.title} onChange={(val: any) => setSubCategories(val)} cacheOptions defaultOptions={subCategoriesList} loadOptions={promiseOptions} />
                    </div>
                  </form>
                  <div className="px-1 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg border border-gray-300">
                    <span className="flex flex-wrap pl-2 pr-1 py-1 m-1 justify-between items-center text-xs font-medium rounded-xl cursor-pointer bg-gray-300 text-gray-600">
                      UI/UX
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4 ml-2 hover:text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div> */}

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCancelClick}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSaveClick}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
