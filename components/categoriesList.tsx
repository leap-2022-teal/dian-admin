import { SingleCategory } from './singleCategory';

export function CategoriesList({ categories, loadCategory }: any) {
  return (
    <>
      {categories?.map((category: any) => {
        return (
          <div key={category._id}>
            <SingleCategory category={category} loadCategory={loadCategory} />
          </div>
        );
      })}
    </>
  );
}
