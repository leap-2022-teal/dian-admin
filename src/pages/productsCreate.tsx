import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import Home from '../../components/home';
import { fetcher } from '../../utils/fetcher';

function productsCreate(props: any) {
  const [categories, setCategories] = useState(props.categories);

  async function handleFileUpload(event: { target: { files: any[]; }; }) {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    // console.log(formDate)

  useEffect(() => {
    fetcher(`categories`).then((data) => setCategories(data));
  }, []);
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
  const promiseOptions = (inputValue: string) =>
    new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 400);
    });
  return (
    <Home>
      <div className="flex flex-col">
        <CreatableSelect
          isClearable
          options={categories?.map((category: any) => {
            return { value: category._id, label: category.title };
          })}
        />
        <AsyncSelect cacheOptions defaultOptions={categoriesList} loadOptions={promiseOptions} />
        <label htmlFor="">title</label>
        <input type="text"></input>
        <input type="file"  name="image" onChange={handleFileUpload} ></input>
        <input type="number"></input>
      </div>
    </Home>
  );
}

export default productsCreate;
