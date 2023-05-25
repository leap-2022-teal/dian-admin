import Link from 'next/link';
import { useState } from 'react';

export default function Pagination({ limit, totalProducts, indexOfFirstPost, indexOfLastPost, previousPage, nextPage, currentPage, search }: any) {
  const pageNumber = [];
  const pageCount = Math.ceil(totalProducts / limit);
  console.log();
  for (let i = 1; i <= pageCount; i++) {
    pageNumber.push(i);
  }

  console.log({ totalProducts });
  console.log({ limit });
  console.log({ pageNumber });

  return (
    <>
      <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span className="flex items-center col-span-3">
          Showing {indexOfFirstPost}-{indexOfLastPost} of {totalProducts}
        </span>
        <span className="col-span-2"></span>
        <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul className="inline-flex items-center">
              <li>
                <button onClick={previousPage} className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
                  <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                  </svg>
                </button>
              </li>

              {pageNumber.map((page) => {
                if (
                  page <= 2 ||
                  (page >= Number(currentPage) - 2 && page <= Number(currentPage) + 2) ||
                  (page >= pageCount - 1 && page <= pageCount) ||
                  (page === 3 && Number(currentPage) === 1) ||
                  (page === pageCount - 2 && Number(currentPage) === pageCount)
                ) {
                  return (
                    <li key={page}>
                      <Link
                        href={`products?search=${search ? search : ''}&page=${page}`}
                        className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple ${
                          Number(currentPage) === page
                            ? 'text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple'
                            : ''
                        }`}
                      >
                        {page}
                      </Link>
                    </li>
                  );
                } else if (page === 3 && pageCount > 5 && Number(currentPage) !== 1) {
                  return (
                    <li key={page}>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple" onClick={previousPage}>
                        ...
                      </button>
                    </li>
                  );
                } else if (page === pageCount - 2 && pageCount > 5 && Number(currentPage) !== pageCount) {
                  return (
                    <li key={page}>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple" onClick={nextPage}>
                        ...
                      </button>
                    </li>
                  );
                } else {
                  return null;
                }
              })}

              <li>
                <button onClick={nextPage} className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
                  <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </span>
      </div>
    </>
  );
}
