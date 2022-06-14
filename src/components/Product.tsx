import { useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();
  return <div>product page {productId}</div>;
};
export default Product;
