import "./App.css";
import AlertBarProvider from "./Contexts/AlertBarContext";
import { AlertBar } from "./components/AlertBar/AlertBar";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AlertBarProvider>
        <AlertBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </AlertBarProvider>
    </div>
  );
}

export default App;
