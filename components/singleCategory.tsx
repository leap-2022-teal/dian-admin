import { useEffect, useState } from 'react';
import { fetcherDelete, fetcherGet, fetcherPost, fetcherPut } from '../utils/fetcher';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

type MyComponentProps = {
  category: any;
  categories: any;
  loadCategory: () => void;
};

export function SingleCategory({ category, loadCategory, categories }: MyComponentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [subCategories, setSubCategories] = useState<any>();
  const [categoryTitle, setCategoryTitle] = useState();

  useEffect(() => {
    fetcherGet(`categories/subCategory/${category._id}`).then((data) => setSubCategories(data));
  }, []);

  function loadSubCategory() {
    fetcherGet(`categories/subCategory/${category._id}`).then((data) => setSubCategories(data));
  }

  function handleDelete() {
    if (window.confirm('Устгах уу')) {
      fetcherDelete(`categories/${category._id}`).then((res) => {
        const { status } = res;
        if (status === 200) {
          toast.success('Амжилттай устгалаа', {
            position: 'top-right',
            autoClose: 800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

            theme: 'light',
          });
          loadCategory();
        }
      });
    }
  }

  function handleDeleteSub(subCategoryId: any) {
    if (window.confirm('Устгах уу')) {
      fetcherDelete(`categories/subCategory/${subCategoryId}`).then((res) => {
        const { status } = res;
        if (status === 200) {
          toast.success('Амжилттай устгалаа', {
            position: 'top-right',
            autoClose: 800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

            theme: 'light',
          });
          loadSubCategory();
        }
      });
    }
  }

  function handleRemove(index: number, subCategoryId: any) {
    const newSubCategories = [...subCategories];
    newSubCategories.splice(index, 1);
    setSubCategories(newSubCategories);

    if (subCategoryId) {
      fetcherDelete(`categories/subCategory/${subCategoryId}`).then((res) => {
        const { status } = res;
        if (status === 200) {
          console.log('removed');
        }
      });
    }
  }

  function handleEdit(e: any) {
    setIsVisible(true);

    categories.filter((category: any) => {
      if (category._id === e) {
        return category;
      }
    });
    setCategoryTitle(category.title);
  }

  const handleCancelClick = () => {
    setIsVisible(false);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && event.target.value.trim()) {
      event.preventDefault();
      setSubCategories([...subCategories, { title: event.target.value }]);
      event.target.value = '';
    }
  };

  const handleSaveClick = () => {
    fetcherPut(`categories/${category._id}`, { title: categoryTitle }).then((res) => {
      const { status } = res;
      if (status === 200) {
        setCategoryTitle(categoryTitle);
        loadCategory();
      }
    });

    subCategories.forEach((subCategory: any) => {
      if (!subCategory.parentId) {
        subCategory.parentId = category._id;
      }
    });

    fetcherPost(`categories/subCategory`, subCategories).then((res) => {
      const { status } = res;
      if (status === 200) {
        setSubCategories(subCategories);
      }
    });
    toast.success('Амжилттай засагдлаа', {
      position: 'top-right',
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,

      theme: 'light',
    });
    setIsVisible(false);
    loadCategory();
  };

  return (
    <>
      <td className="px-4 py-3">
        <div className="flex items-center text-sm">
          <div>
            <p className="font-semibold">{category.title}</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-xs flex flex-wrap">
        {subCategories?.map((subCategory: any) => {
          return (
            <div key={subCategory._id} className="mb-3 flex flex-wrap rounded-lg ">
              <span className="flex flex-wrap pl-2 pr-1 py-1 m-1 justify-between items-center text-xs font-medium rounded-xl cursor-pointer bg-purple-500 text-gray-200 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100">
                {subCategory.title}
                <svg onClick={() => handleDeleteSub(subCategory._id)} xmlns="http://www.w3.org/2000/svg" className="h-5 w-4 ml-1 hover:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          );
        })}
      </td>
      <td className="px-4 py-3 text-sm">
        <div className="flex items-center space-x-4 text-sm">
          <button
            onClick={(e: any) => handleEdit(category._id)}
            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
            aria-label="Edit"
          >
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
          </button>
          <button
            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
            aria-label="Delete"
          >
            <svg onClick={handleDelete} className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </td>

      {isVisible && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Ангилал засах</h3>
                </div>

                <div className="m-[1rem] px-[1rem] grid grid-cols-1 gap-10">
                  <div>
                    <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                      Ангилал
                    </label>
                    <input
                      value={categoryTitle}
                      onChange={(e: any) => setCategoryTitle(e.target.value)}
                      placeholder=" Aнгилалын нэрээ оруулна уу"
                      type="text"
                      name="title"
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                      Дэд Ангилал
                    </label>
                    <input
                      onKeyDown={handleKeyDown}
                      placeholder="Дэд ангилалын нэрээ оруулна уу"
                      type="text"
                      name="title"
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="mx-[1rem] px-[1rem]">
                  {subCategories?.map((subCategory: any, index: number) => (
                    <div key={index} className="flex gap-10">
                      <span className="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer  text-gray-700 ">
                        {subCategory.title}
                        <svg
                          onClick={(e) => handleRemove(index, subCategory._id)}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-3 hover:text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  ))}
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
