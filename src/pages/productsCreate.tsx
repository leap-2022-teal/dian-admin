import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import Home from '../../components/home';
import { fetcher } from '../../utils/fetcher';

// import CKeditor from '../../components/CKeditor';

function productsCreate(props: any) {
  const [categories, setCategories] = useState(props.categories);

  useEffect(() => {
    fetcher(`categories`).then((data) => setCategories(data));
  }, []);
  // categories?.map((category: any) => {
  //   const options = [{ value: category._id, label: category.title }];
  // });

  const categoriesList = categories?.map((category: any) => {
    return { value: category._id, label: category.title };
  });
  const filterColors = (inputValue: string) => {
    return categories
      ?.map((category: any) => {
        return { value: category._id, label: category.title };
      })
      .filter((i: any) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };
  // let CategoryOption = [];
  const promiseOptions = (inputValue: string) =>
    new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 400);
    });
  return (
    <Home>
      <label htmlFor="">title</label>
      <input type="text"></input>
      <CreatableSelect
        isClearable
        options={categories?.map((category: any) => {
          return { value: category._id, label: category.title };
        })}
      />
      <AsyncSelect cacheOptions defaultOptions={categoriesList} loadOptions={promiseOptions} />
      <input type="file"></input>
      <input type="number"></input>
    </Home>
  );
}

export default productsCreate;
