import { useEffect, useState } from 'react';
import Home from '../../components/home';
import { fetcher } from '../../utils/fetcher';
import { CategoriesNew } from '../../components/categoriesNew';
import { CategoriesList } from '../../components/categoriesList';

export default function Category(props: any) {
  const [categories, setCategories] = useState();
  useEffect(() => {
    fetcher(`categories`).then((data) => setCategories(data));
  }, []);

  function loadCategory() {
    fetcher(`categories`).then((data) => setCategories(data));
  }

  return (
    <Home>
      <CategoriesNew loadCategory={loadCategory} />
      <CategoriesList categories={categories} loadCategory={loadCategory} />
    </Home>
  );
}
