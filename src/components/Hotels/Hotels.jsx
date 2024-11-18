import { HomeIcon } from "@heroicons/react/24/solid";
import { useHotels } from "../../context/HotelsProvider";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

function Hotels() {
  const { hotels, isLoading } = useHotels();

  if (isLoading) return <Loader />;

  return (
    <>
      <h2 className="text-xl font-bold mb-4">
        Search Results ({hotels.length})
      </h2>
      <div className="flex flex-col gap-2">
        {hotels.map((item) => (
          <HotelItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default Hotels;

function HotelItem({ item }) {
  const { currentHotel } = useHotels();
  return (
    <Link
      to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
    >
      <div className="rounded-lg flex w-11/12 gap-2">
        <img
          src="/src/images/pexels-pixabay-258154.jpg"
          alt={item.name}
          className="w-28 h-28 rounded-2xl object-cover object-center border overflow-hidden"
        />
        <div className="flex flex-1 justify-between items-center ">
          <div className="flex flex-col justify-center gap-1">
            <h3 className="text-lg font-bold">{item.smart_location}</h3>
            <span className="text-sm text-gray-400">{item.name}</span>
            <span className="text-sm font-bold text-gray-500">
              €&nbsp;{item.price}&nbsp;
              <span>night</span>
            </span>
          </div>
          {currentHotel && currentHotel.id === item.id ? (
            <HomeIcon className="text-green-600 size-5" />
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
}
