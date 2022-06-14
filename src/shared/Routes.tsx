import { Route, Routes as ReactRoutes } from "react-router-dom";
import Home from "../components/Home";
import Products from "../components/Products";
import Profile from "../components/Profile";
import Cart from "../components/Cart";
import { NotFound } from "../components/NotFound";
import Product from "../components/Product";

const Router = () => {
  return (
    <ReactRoutes>
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Products />} />
      <Route path="/search/:productId" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/*" element={<NotFound />} />
    </ReactRoutes>
  );
};
export default Router;
