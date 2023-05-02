import { useEffect, useState } from 'react';
import { CategoriesList } from '../../components/categoriesList';
import { CategoriesNew } from '../../components/categoriesNew';
import { fetcherGet } from '../../utils/fetcher';

export default function Category(props: any) {
  const [categories, setCategories] = useState();
  useEffect(() => {
    fetcherGet(`categories`).then((data) => setCategories(data));
  }, []);

  function loadCategory() {
    fetcherGet(`categories`).then((data) => setCategories(data));
  }

  return (
    <div className="m-[2rem]">
      <CategoriesNew loadCategory={loadCategory} categories={categories} />
      <CategoriesList categories={categories} loadCategory={loadCategory} />
    </div>
  );
}
