import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HotelsProvider } from "./components/contexts/HotelsContext";

import Homepage from "./pages/Homepage";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AppLayout from "./pages/AppLayout";
import HotelList from "./components/hotel/HotelList";
import Hotel from "./components/hotel/Hotel";
import PageNotFound from "./pages/PageNotFound";
import { UsersProvider } from "./components/contexts/UsersContext";
import { CommentsProvider } from "./components/contexts/CommentsContext";
import { AuthProvider } from "./components/contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import User from "./components/user/User";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <CommentsProvider>
            <HotelsProvider>
              <Routes>
                <Route index element={<Homepage />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/app" element={<AppLayout />}>
                  <Route index element={<Navigate replace to="hotels" />} />
                  <Route path="hotels" element={<HotelList />} />
                  <Route path="hotels/:id" element={<Hotel />} />
                  <Route
                    path="profile"
                    element={<ProtectedRoute element={<User />} />}
                  />
                </Route>
                {/* <Route path="/profile" element={<Login />} /> */}
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Gallery />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </HotelsProvider>
          </CommentsProvider>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
