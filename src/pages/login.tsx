import { useState } from 'react';
import { fetcherLogin } from '../../utils/fetcher';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import LoginImage from '../../public/login.png';
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  function handleLogin(e: any) {
    e.preventDefault();
    fetcherLogin('users/login', { email, password }).then((res: any) => {
      const { token } = res;
      if (token) {
        localStorage.setItem('loginToken', token);
        setEmail('');
        setPassword('');
        (window as Window).location = '/';
        toast('Амжилттай нэвтэрлээ', {
          position: 'top-right',
          type: 'success',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast(res.message, {
          position: 'top-right',
          type: 'error',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setError(true);
      }
    });
  }

  setTimeout(() => {
    setError(false);
  }, 3000);

  return (
    <div className="h-screen w-screen md:flex ">
      <div className="flex items-center justify-center px-6 py-8 mx-auto md:my-auto max-w-[850px] w-full bg-white rounded-lg lg:shadow lg   ">
        <div className="p-4 md:space-y-6 md:flex sm:p-8 md:justify-around md:gap-4">
          <Image src={LoginImage} alt="" className="md:w-1/2" />
          <div className="md:w-1/2">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">Нэвтрэх</h1>
            <form className="space-y-4 md:space-y-6 mt-5" action="#">
              {!error ? (
                <div>
                  <div className="mb-[1rem]">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                      И-мэйл хаяг
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e: any) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 "
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
                      Нууц үг
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e: any) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                    />
                  </div>
                </div>
              ) : (
                <div className="animate-shake">
                  <div className="mb-[1rem]">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                      И-мэйл хаяг
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e: any) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 "
                      placeholder="name@gmail.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
                      Нууц үг
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e: any) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                onClick={handleLogin}
                className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Нэвтрэх
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
