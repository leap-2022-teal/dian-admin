import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext<any>(undefined);

export function UserProvider({ children }: any) {
  const user = useCurrentUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useCurrentUser() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const token = localStorage.getItem('loginToken');

    if (token) {
      axios
        .get('http://localhost:8000/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res: any) => {
          setUser(res.data);
        })
        .catch((e) => {
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, []);

  return user;
}
