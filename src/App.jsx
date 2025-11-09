import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import useScrollRestoration from "./components/ScrollRestoration";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useScrollRestoration();
  return (
    <Router basename="/ultraverse-marketplace">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
        <Route path="/author/:authorId" element={<Author />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
