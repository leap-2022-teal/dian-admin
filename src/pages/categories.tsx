import { useEffect, useState } from 'react';
import Home from '../../components/home';
import { fetcher } from '../../utils/fetcher';

export default function Category(props: any) {
  const [categories, setCategories] = useState(props.categories);

  useEffect(() => {
    fetcher(`categories`).then((data) => setCategories(data));
  }, []);

  return (
    <Home>
      {categories?.map((category: any) => {
        return (
          <div key={category._id} className="flex">
            <div>{category.title}</div>
            <div className="flex">
              <button onClick={() => {}}>Edit</button>
              <button onClick={() => {}}>Delete</button>
            </div>
          </div>
        );
      })}
    </Home>
  );
}
