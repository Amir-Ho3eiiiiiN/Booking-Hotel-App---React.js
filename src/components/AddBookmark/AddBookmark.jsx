// import { useNavigate } from "react-router-dom";
// import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarksProvider";
import useUrlLocation from "../../hooks/useUrlLocation";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import Loader from "../Loader/Loader";
// import axios from "axios";
// import Loader from "../Loader/Loader";
// import ReactCountryFlag from "react-country-flag";
// import { useBookmark } from "../context/BookmarkListContext";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark, isLoading } = useBookmarks();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );

        if (!data.countryCode)
          throw new Error(
            "this location is not a city! please click somewhere else."
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode); // FR, IR ,...
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoading) return <Loader />;
  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return <storng>{geoCodingError}</storng>;

  return (
    <div>
      <h2 className="mb-3 text-xl font-bold">Bookmark New Location</h2>
      <form className="border rounded-lg p-4 w-[98%]">
        <div className="mb-2">
          <label className="mb-1 block pl-1 text-gray-500" htmlFor="cityName">
            CityName
          </label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            className="border px-4 py-1 rounded-md w-full"
            id="cityName"
          />
        </div>
        <div className="mb-2">
          <label className="mb-1 block pl-1 text-gray-500" htmlFor="country">
            Country
          </label>
          <div className="relative">
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              name="country"
              id="country"
              className="border px-4 py-1 rounded-md w-full"
            />
            <ReactCountryFlag
              className="absolute right-2 top-1/2 -translate-y-1/2"
              svg
              countryCode={countryCode}
            />
          </div>
          {/* <span className="flag">{countryCode}</span> */}
        </div>
        <div className="flex justify-between w-full mt-4">
          <button
            className="rounded-xl px-4 py-1 bg-red-400 text-gray-50 hover:bg-red-300"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-xl px-4 py-1 bg-green-600 text-gray-50 hover:bg-green-500"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddNewBookmark;
