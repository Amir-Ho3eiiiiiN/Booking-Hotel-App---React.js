import { useParams } from "react-router-dom";
import { useHotels } from "../../context/HotelsProvider";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

function SingleHotel() {
  const { getHotel, currentHotel, isLoadingCurrHotel } = useHotels();
  const { id } = useParams();
  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;

  return (
    <div className="px-4">
      <h2 className="text-xl font-bold">{currentHotel.name}</h2>
      <div className="text-sm text-gray-500 mb-3">
        {currentHotel.number_of_reviews} reviews &bull;{" "}
        {currentHotel.smart_location}
      </div>
      <img
        className="rounded-xl w-full"
        src="/src/Images/pexels-pixabay-258154.jpg"
        alt={currentHotel.name}
      />
    </div>
  );
}

export default SingleHotel;
