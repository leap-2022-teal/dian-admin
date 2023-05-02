import { ToastContainer } from 'react-toastify';
import { SingleCategory } from './singleCategory';

export function CategoriesList({ categories, loadCategory }: any) {
  return (
    <>
      <ToastContainer />
      <div className="mt-[1rem] w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Sub Category</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {categories?.map((category: any) => {
                return (
                  <tr key={category._id} className="text-gray-700 dark:text-gray-400">
                    <SingleCategory categories={categories} category={category} loadCategory={loadCategory} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
