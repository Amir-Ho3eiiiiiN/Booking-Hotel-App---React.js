import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmarks } from "../../context/BookmarksProvider";

export default function BookmarkLayout() {
  const { bookmarks } = useBookmarks();
  return (
    <div className="w-full flex content-container">
      <div className="flex-1 p-0 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-900 ">
        <Outlet />
      </div>
      <div className="flex-1 p-0 relative">
        <Map markerLocations={bookmarks} />
      </div>
    </div>
  );
}
