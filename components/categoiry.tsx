import { useEffect, useState } from 'react';

export function Category(props: any) {
  const [categories, setCategories] = useState(props.categories);

  useEffect(() => {
    fetch(`http://localhost:8000/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  console.log(categories);
  return (
    <div>
      {categories?.map((category: any) => (
        <div key={category._id}>{category.title}</div>
      ))}
    </div>
  );
}