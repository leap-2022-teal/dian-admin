import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { fetcherGet, fetcherPost, fetcherPostFile } from '../../utils/fetcher';

function ProductsCreate(props: any) {
  const [categories, setCategories] = useState(props.categories);
  const [image, setImage] = useState(props.image);
  const [title, setTitle] = useState(props.title);
  const [price, setPrice] = useState(props.title);
  const [categoryId, setCategoryId] = useState(props.title);

  async function handleFileUpload(event: any) {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile);
    await fetcherPostFile(`upload-image`, formData).then((data: any) => setImage(data));
  }

  useEffect(() => {
    fetcherGet(`categories`).then((data: any) => setCategories(data));
  }, []);

  const categoriesList = categories?.map((category: any) => {
    return { value: category._id, label: category.title };
  });

  const filterCategories = (inputValue: string) => {
    return categories
      ?.map((category: any) => {
        return { value: category._id, label: category.title };
      })
      .filter((i: any) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(filterCategories(inputValue));
      }, 400);
    });

  function submit() {
    fetcherPost(`products`, { title, price, image, categoryId }).then((res: any) => {
      const { status } = res;
      if (status === 200) {
        console.log('1');
      }
    });
  }

  return (
    <div className="flex flex-col">
      <AsyncSelect value={categoryId} onChange={(val) => setCategoryId(val)} cacheOptions defaultOptions={categoriesList} loadOptions={promiseOptions} />
      <input placeholder="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="file" name="image" onChange={handleFileUpload} />
      <input placeholder="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <img src={image.path} />
      <button onClick={submit}>submit</button>
    </div>
  );
}

export default ProductsCreate;
