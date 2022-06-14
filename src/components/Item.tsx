import { useNavigate } from "react-router-dom";
import Flex from "./Flex";

type ItemProps = {
  img: string;
  title: string;
  id: string;
};

const Item: React.FC<ItemProps> = ({ title, img, id }) => {
  const navigate = useNavigate();
  const showProductPage = () => {
    navigate(`/search/${id}`);
  };
  return (
    <div className="item" onClick={showProductPage}>
      ddd
      <div className="item-img">
        <img
          src={
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-blue-select?wid=940&hei=1112&fmt=png-alpha&.v=1645552346275"
          }
          alt=""
          width="100%"
          height="100%"
        />
      </div>
      <div className="item-content">
        <span>{title}</span>
      </div>
    </div>
  );
};
export default Item;
