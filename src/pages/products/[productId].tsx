import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { fetcherDelete, fetcherGet, fetcherPostFile, fetcherPut } from '../../../utils/fetcher';

export default function SingleCategory({ product }: any, props: any) {
  const router = useRouter();
  const [categories, setCategories] = useState(props.categories);
  const [image, setImage] = useState(props.image);
  const [title, setTitle] = useState(props.title);
  const [price, setPrice] = useState(props.title);
  const [categoryId, setCategoryId] = useState(props.title);
  const [variant, setVariant] = useState('edit');
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === 'edit' ? 'normal' : 'edit'));
  }, []);

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

  const category = categories?.filter((category: any) => {
    return category._id === product.categoryId;
  })[0];

  function handleDelete() {
    if (window.confirm('Устгах уу')) {
      fetcherDelete(`products/${product._id}`).then((res) => {
        const { status } = res;
        if (status === 200) {
          router.push('/products');
        }
      });
    }
  }

  function submit() {
    fetcherPut(`products/${product._id}`, { title, price, image, categoryId }).then((res: any) => {
      const { status } = res;
      if (status === 200) {
        console.log('1');
      }
    });
  }
  useEffect(() => {
    setPrice(product.unitPrice);
    setTitle(product.title);
  }, [product]);
  return (
    <div>
      {variant === 'edit' ? (
        <>
          <img src={product.imageUrl} />
          <h3 className="truncate text-slate-800">{product?.title}</h3>
          <p>{category?.title}</p>
          <p>{product.unitPrice}</p>
          <button className="border rounded" onClick={handleDelete}>
            utsgah
          </button>
        </>
      ) : (
        <>
          <input type="file" onChange={handleFileUpload}></input>
          <input value={title} type="text" onChange={(e) => setTitle(e.target.value)}></input>
          <AsyncSelect value={categoryId} onChange={(val) => setCategoryId(val)} cacheOptions defaultOptions={categoriesList} loadOptions={promiseOptions} />
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <button onClick={submit}>submit</button>
        </>
      )}
      <button onClick={toggleVariant} className=" ml-1 hover:under border rounded">
        {variant === 'edit' ? 'zasah' : 'bolih'}
      </button>
    </div>
  );
}
export async function getServerSideProps({ params }: any) {
  const { productId } = params;
  const product = await fetcherGet(`products/${productId}`);
  return {
    props: {
      product,
    },
    // revalidate: 10,
  };
}
