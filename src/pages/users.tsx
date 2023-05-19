import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/layout';
import { fetcherDelete, fetcherGet } from '../../utils/fetcher';

export default function User() {
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    fetcherGet(`users`).then((data) => setUsers(data));
  }, []);

  function loadUser() {
    fetcherGet(`users`).then((data) => setUsers(data));
  }

  function handleDelete(user: any) {
    console.log(user);
    fetcherDelete(`users/${user._id}`).then((res) => {
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
        loadUser();
      }
    });
  }

  console.log(users);
  return (
    <Layout>
      <ToastContainer />
      <table className="m-[2rem] w-full whitespace-no-wrap">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            <th className="px-4 py-3">Хэрэглэгчийн нэр</th>
            <th className="px-4 py-3">Эрх</th>
            <th className="px-4 py-3">Бүртгүүлсэн өдөр</th>
            <th className="px-4 py-3">Үйлдэл</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          {users?.map((user: any) => (
            <tr key={user._id} className="text-gray-700 dark:text-gray-400">
              <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                  <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                    <img
                      className="object-cover w-full h-full rounded-full"
                      src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                      alt=""
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                  </div>
                  <div>
                    <p className="font-semibold">{user.email}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400"></p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{user.role}</td>

              <td className="px-4 py-3 text-sm">{user?.createdDate.slice(0, 10)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center space-x-4 text-sm">
                  <button
                    onClick={(e) => handleDelete(user)}
                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                    aria-label="Delete"
                  >
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
