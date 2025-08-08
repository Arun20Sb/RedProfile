import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import PersonasList from "./pages/PersonasList";
import PersonaView from "./pages/PersonaView";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            marginRight: "40px",
            marginTop: "90px",
            fontSize: "18px",
          },
        }}
      />
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personas" element={<PersonasList />} />
            <Route path="/personas/:username" element={<PersonaView />} />
            <Route path="*" element={<Navigate to="/404.html" replace />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
