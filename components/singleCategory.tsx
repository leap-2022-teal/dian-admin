import { useEffect, useState } from 'react';
import { fetcherDelete, fetcherGet, fetcherPut } from '../utils/fetcher';

type MyComponentProps = {
  category: any;
  loadCategory: () => void;
};

export function SingleCategory({ category, loadCategory }: MyComponentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const [subCategories, setSubCategories] = useState<any>();

  useEffect(() => {
    fetcherGet(`categories/${category._id}`).then((data) => setSubCategories(data));
  }, []);

  function handleDelete() {
    if (window.confirm('Устгах уу')) {
      fetcherDelete(`categories/${category._id}`).then((res) => {
        const { status } = res;
        if (status === 200) {
          loadCategory();
        }
      });
    }
  }

  function handleDeleteSub(subCategoryId: any) {
    console.log(subCategories._id);
    if (window.confirm('Устгах уу')) {
      fetcherDelete(`categories/subCategory/${subCategoryId}`).then((res) => {
        const { status } = res;
        if (status === 200) {
          console.log('amjilttai');
        }
      });
    }
  }

  function handleEdit() {
    setIsVisible(true);
  }

  const handleCancelClick = () => {
    setIsVisible(false);
  };

  const handleSaveClick = () => {
    fetcherPut(`categories/${category._id}`, { title: text }).then((res) => {
      const { status } = res;
      if (status === 200) {
        setText(text);
        setIsVisible(false);
        loadCategory();
      }
    });
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
        {subCategories?.map((category: any) => {
          return (
            <div key={category._id} className="mb-3 flex flex-wrap rounded-lg ">
              <span className="flex flex-wrap pl-2 pr-1 py-1 m-1 justify-between items-center text-xs font-medium rounded-xl cursor-pointer bg-purple-500 text-gray-200 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100">
                {category.title}
                <svg onClick={() => handleDeleteSub(category._id)} xmlns="http://www.w3.org/2000/svg" className="h-5 w-4 ml-1 hover:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
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
            onClick={handleEdit}
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Ангилал засах</h2>
              <button className="text-gray-700" onClick={() => setIsVisible(false)}>
                Хаах
              </button>
            </div>
            <div className="mb-4">
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="input-field"
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleCancelClick}>
                Буцах
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSaveClick}>
                Хадгалах
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
