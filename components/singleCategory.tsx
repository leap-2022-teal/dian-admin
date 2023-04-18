import axios from 'axios';

type MyComponentProps = {
  category: any;
  loadCategory: () => void;
};

export function SingleCategory({ category, loadCategory }: MyComponentProps) {
  function handleDelete() {
    if (window.confirm('Устгах уу')) {
      axios.delete(`http://localhost:8000/categories/${category._id}`).then((res) => {
        const { status } = res;
        if (status === 200) {
          loadCategory();
        }
      });
    }
  }
  return (
    <div key={category._id} className="flex">
      <div>{category.title}</div>
      <div className="flex">
        <button>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
