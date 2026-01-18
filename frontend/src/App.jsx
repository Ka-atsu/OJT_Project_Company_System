import { Routes, Route } from "react-router-dom";

import RootLayout from "./components/layouts/RootLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Safety from "./pages/Safety";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="safety" element={<Safety />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
