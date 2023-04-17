import Home from '../../components/home';

import CreatableSelect from 'react-select/creatable';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
function productsCreate() {
  return (
    <Home>
      <label htmlFor="">title</label>
      <input></input>
      <CreatableSelect isClearable options={options} />
      <CreatableSelect isClearable options={options} />
    </Home>
  );
}

export default productsCreate;
