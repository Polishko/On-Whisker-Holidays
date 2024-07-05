import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HotelsProvider } from "./components/contexts/HotelsContext";

import Homepage from "./pages/Homepage";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import HotelList from "./components/hotel/HotelList";
import Hotel from "./components/hotel/Hotel"; // Changed: Renamed HotelDetail to HotelDetails
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <HotelsProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="hotels" />} />
            <Route path="hotels" element={<HotelList />} />
            <Route path="hotels/:id" element={<Hotel />} />
          </Route>
          <Route path="/profile" element={<Login />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Gallery />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </HotelsProvider>
  );
}

export default App;
