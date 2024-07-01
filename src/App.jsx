import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
