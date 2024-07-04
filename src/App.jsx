import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HotelsProvider } from "./components/contexts/HotelsContext";

import Homepage from "./pages/Homepage";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <HotelsProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/app" element={<AppLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </HotelsProvider>
  );
}

export default App;
