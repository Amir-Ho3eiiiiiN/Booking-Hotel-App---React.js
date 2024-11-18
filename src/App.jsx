import { Route, Routes } from "react-router-dom";
import "./App.css";
import "leaflet/dist/leaflet.css";
import AppLayout from "./components/AppLayout/AppLayout";
import LocationList from "./components/LocationList/LocationList";
import MapsLayout from "./components/MapsLayout/MapsLayout";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BookmarkList from "./components/BookmarksList/BookmarkList";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddBookmark from "./components/AddBookmark/AddBookmark";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<LocationList />} />
        <Route index element={<LocationList />} />
        <Route path="/hotels" element={<MapsLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route
          path="/bookmark"
          element={
            <ProtectedRoute>
              <BookmarkLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<BookmarkList />} />
          <Route path=":id" element={<SingleBookmark />} />
          <Route path="add" element={<AddBookmark />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
