import { useEffect, useState } from 'react';
import { fetcherGet, fetcherPost } from '../utils/fetcher';
import AsyncSelect from 'react-select/async';

export function CategoriesNew({ loadCategory }: any) {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [subCategories, setSubCategories] = useState<any>();

  useEffect(() => {
    fetcherGet(`categories/subCategory`).then((data) => setSubCategories(data));
  }, []);

  const subCategoriesList = subCategories?.map((subCategory: any) => {
    return { value: subCategory.title, label: subCategory.title };
  });
  console.log(subCategories);

  const filterSubCategories = (inputValue: string) => {
    return subCategories
      ?.map((subCategory: any) => {
        return { value: subCategory._id, label: subCategory.title };
      })
      .filter((i: any) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(filterSubCategories(inputValue));
      }, 400);
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
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Ангилал нэмэх</h3>
                  <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>

                <div className="mx-[2rem] grid grid-cols-2 md:flex-row gap-10">
                  <div>
                    <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                      Ангилалын нэр
                    </label>
                    <input
                      placeholder=" Ангилалын нэрээ оруулна уу"
                      type="text"
                      name="title"
                      value={title}
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full  p-8 items-center bg-white rounded-2xl shadow-xl overflow-hidden sm:max-w-4xl hover:shadow-xl dark:bg-gray-500">
                  <form action="#">
                    <div className="mb-2">
                      <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                        Ангилал
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
                </div>

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
