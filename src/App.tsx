import "./App.css";
import AlertBarProvider from "./Contexts/AlertBarContext";
import { AlertBar } from "./components/AlertBar/AlertBar";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <AlertBarProvider>
        <AlertBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AlertBarProvider>
    </div>
  );
}

export default App;
