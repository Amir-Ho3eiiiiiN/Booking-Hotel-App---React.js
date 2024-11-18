import { Link } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarksProvider";
import { TrashIcon } from "@heroicons/react/24/solid";
import ReactCountryFlag from "react-country-flag";
import Loader from "../Loader/Loader";

export default function BookmarkList() {
  const { bookmarks, isLoading } = useBookmarks();

  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p>there is no bookmarked location</p>;

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Bookmark List</h3>
      <div className="flex flex-col gap-3 w-[98%]">
        {bookmarks.map((item) => (
          <BookMarkItem key={item.id} bookmark={item} />
        ))}
      </div>
    </div>
  );
}

function BookMarkItem({ bookmark }) {
  const { currentBookmark, deleteBookmark } = useBookmarks();
  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteBookmark(id);
  };

  return (
    <Link
      to={`/bookmark/${bookmark.id}?lat=${bookmark.latitude}&lng=${bookmark.longitude}`}
      className={`flex justify-between border py-3 px-4 rounded-lg ${
        currentBookmark?.id === bookmark.id ? "bg-blue-100" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        {" "}
        <ReactCountryFlag svg countryCode={bookmark.countryCode} />
        <h4 className="text-lg font-semibold">{bookmark.cityName}</h4>
        <span className="text-sm">{bookmark.country}</span>
      </div>
      <button className="pl-2 " onClick={(e) => handleDelete(e, bookmark.id)}>
        <TrashIcon className="size-5 text-red-500" />
      </button>
    </Link>
  );
}
