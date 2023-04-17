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
      <div>
        {categories?.map((category: any) => (
          <div key={category._id}>{category.title}</div>
        ))}
      </div>
    </Home>
  );
}
