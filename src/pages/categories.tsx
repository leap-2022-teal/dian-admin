import { useEffect, useState } from 'react';
import Home from '../../components/home';
import { fetcherGet } from '../../utils/fetcher';
import { CategoriesNew } from '../../components/categoriesNew';
import { CategoriesList } from '../../components/categoriesList';

export default function Category(props: any) {
  const [categories, setCategories] = useState();
  useEffect(() => {
    fetcherGet(`categories`).then((data) => setCategories(data));
  }, []);

  function loadCategory() {
    fetcherGet(`categories`).then((data) => setCategories(data));
  }

  return (
    <Home>
      <CategoriesNew loadCategory={loadCategory} />
      <CategoriesList categories={categories} loadCategory={loadCategory} />
    </Home>
  );
}
