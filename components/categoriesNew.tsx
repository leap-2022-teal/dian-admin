import { useState } from 'react';
import { fetcherPost } from '../utils/fetcher';
import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'react-toastify';

export function CategoriesNew({ loadCategory, categories }: any) {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState<any>();

  const categoriesList = categories?.map((category: any) => {
    return { value: category._id, label: category.title };
  });

  const handleCancelClick = () => {
    setIsVisible(false);
    setTitle('');
  };

  const handleSaveClick = () => {
    fetcherPost(`categories`, { title, subTitle }).then((res) => {
      const { status } = res;
      if (status === 200) {
        setIsVisible(false);
        setTitle('');
        setSubTitle('');
        loadCategory();
        toast.success('Амжилттай нэмэгдлээ', {
          position: 'top-right',
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,

          theme: 'light',
        });
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
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Дэд ангилал</label>
                    <input
                      value={subTitle}
                      onChange={(e) => setSubTitle(e.target.value)}
                      placeholder="  Дэд ангилалын нэрээ оруулна уу"
                      type="text"
                      name="title"
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCancelClick}
                  >
                    Хаах
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSaveClick}
                  >
                    Хадгалах
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
