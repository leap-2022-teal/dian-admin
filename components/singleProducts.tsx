export default function SingleProduct({ product }: any) {
  if (!product) return null;
  return (
    <tr key={product._id} className="border-black border-2 border-solid">
      <td>
        <img className="w-2/12" src={product.imageUrl} />
      </td>
      <td>{product.title}</td>
      <td>{product.unitPrice}</td>
    </tr>
  );
}
