import { useState } from 'react';
import { fetcherDelete, fetcherPut } from '../utils/fetcher';

type MyComponentProps = {
  category: any;
  loadCategory: () => void;
};

export function SingleCategory({ category, loadCategory }: MyComponentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');

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
      <div key={category._id} className="flex ml-11 border-black border-2 border-solid">
        <div>{category.title}</div>
        <div className="flex">
          <button className="bg-red-500" onClick={handleEdit}>
            Edit
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>

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
