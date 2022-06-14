import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Routes from "./shared/Routes";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}
