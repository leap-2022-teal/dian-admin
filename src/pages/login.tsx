import { useState } from 'react';
import { fetcherLogin } from '../../utils/fetcher';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function handleLogin(e: any) {
    e.preventDefault();
    fetcherLogin('users/login', { email, password }).then((res: any) => {
      const { token } = res;
      if (token) {
        localStorage.setItem('loginToken', token);
        setEmail('');
        setPassword('');
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
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl text-center mb-6">Админ</h1>
          <form>
            {!error ? (
              <div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Нэвтрэх нэр
                  </label>
                  <input
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                    Нууц үг
                  </label>
                  <input
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="animate-shake">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Нэвтрэх нэр
                  </label>
                  <input
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 rounded border border-red-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                    Нууц үг
                  </label>
                  <input
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 rounded border border-red-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                  />
                </div>
              </div>
            )}

            <button onClick={handleLogin} type="submit" className="w-full bg-purple-500 text-white font-semibold py-2 rounded hover:bg-purple-600 transition-colors duration-300">
              Нэвтрэх
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
