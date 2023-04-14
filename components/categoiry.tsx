import { useEffect, useState } from 'react';
import { fetcher } from '../utils/fetcher';

export function Category(props: any) {
  const [categories, setCategories] = useState(props.categories);

  useEffect(() => {
    fetcher(`categories`).then((data) => setCategories(data));
  }, []);

  return (
    <div>
      {categories?.map((category: any) => (
        <div key={category._id}>{category.title}</div>
      ))}
    </div>
  );
}
