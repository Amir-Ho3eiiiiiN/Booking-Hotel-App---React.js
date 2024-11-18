import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../../context/BookmarksProvider";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookmark, isLoading, currentBookmark } = useBookmarks();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoading || !currentBookmark) return <Loader />;

  return (
    <>
      <button onClick={() => navigate(-1)} className="border rounded-md px-3 py-1">
        &larr; Back
      </button>
      <div className="flex items-center gap-2 pt-3">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        <h4 className="text-lg font-semibold">{currentBookmark.cityName}</h4>
      </div>
      <span className="text-sm">{currentBookmark.country}</span>
    </>
  );
}

export default SingleBookmark;
