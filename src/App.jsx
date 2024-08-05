import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./components/contexts/AuthContext";
import { UsersProvider } from "./components/contexts/UsersContext";
import { CommentsProvider } from "./components/contexts/CommentsContext";
import { RatingsProvider } from "./components/contexts/RatingsContext";
import { HotelsProvider } from "./components/contexts/HotelsContext";

import PrivateRoute from "./routes/PrivateRoute";
import GuestRoute from "./routes/GuestRoute";

import Homepage from "./pages/Homepage";
import Map from "./pages/Map";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import About from "./pages/About";

import HotelList from "./components/hotel/HotelList";
import Hotel from "./components/hotel/Hotel";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <CommentsProvider>
            <RatingsProvider>
              <HotelsProvider>
                <Routes>
                  <Route index element={<Homepage />} />

                  <Route path="/" element={<AppLayout />}>
                    <Route index element={<Navigate replace to="hotels" />} />
                    <Route path="hotels" element={<HotelList />} />
                    <Route path="hotels/:id" element={<Hotel />} />
                  </Route>
                  <Route path="/map" element={<Map />} />

                  <Route path="/about" element={<About />} />

                  <Route element={<GuestRoute />}>
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                  </Route>

                  <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                  </Route>

                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </HotelsProvider>
            </RatingsProvider>
          </CommentsProvider>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
