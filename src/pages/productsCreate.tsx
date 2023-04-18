import { useState } from 'react';
import Home from '../../components/home';

import CreatableSelect from 'react-select/creatable';
import CKeditor from '../../components/CKeditor';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
function productsCreate(props: any) {
  const [content, setContent] = useState();

  // function submit() {
  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/articles`, {
  //       content,
  //     })
  //     .then((res: any) => {
  //       const { status } = res;
  //       if (status === 201) {
  //         alert('Success');
  //       }
  //     });
  // }

  return (
    <Home>
      <label htmlFor="">title</label>
      <input></input>
      <CreatableSelect isClearable options={options} />
      <CreatableSelect isClearable options={options} />

      <div className="">
        <CKeditor
          onChange={function (data: string): void {
            throw new Error('Function not implemented.');
          }}
          editorLoaded={false}
          name={''}
          value={''}
        />
        {/* <CKEditor
          // editor={ClassicEditor}
          // data={content}
          // onChange={handleEdit}
          // onChange={(event, editor) => {
          //   const data = editor.getData();
          // }}
        /> */}
        {/* <button onClick={submit}>Хадгалах</button> */}
      </div>
    </Home>
  );
}

export default productsCreate;
