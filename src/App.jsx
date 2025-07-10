import { BrowserRouter, Route, Router, Routes } from "react-router";
import Home from "./pages/Home";
import DetailsPages from "./pages/Detail";
import EvolutionPage from "./pages/EvolutionPage";
import Favourite from "./pages/Favourite";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<DetailsPages />} />
        <Route path="/evolve" element={<EvolutionPage />} />
        <Route path="/my-pokemon" element={<Favourite />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
