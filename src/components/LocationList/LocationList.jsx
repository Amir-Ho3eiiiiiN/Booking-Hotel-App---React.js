import { useHotels } from "../../context/HotelsProvider";
import Loader from "../Loader/Loader";

function LocationList() {
  const { isLoading, hotels } = useHotels();
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Nearby Locations</h2>
      <div className="grid grid-cols-3 gap-4 items-center">
        {isLoading ? (
          <Loader />
        ) : (
          hotels.map((item) => <HotelView key={item.id} item={item} />)
        )}
      </div>
    </>
  );
}

export default LocationList;

function HotelView({ item }) {
  return (
    <div className="flex-1 max-w-screen-md flex-col">
      <img
        src="/src/images/pexels-pixabay-258154.jpg"
        alt=""
        className="w-full h-80 object-cover rounded-lg object-center"
      />
      <h3 className="text-lg font-bold">{item.smart_location}</h3>
      <p className="text-sm text-gray-400">{item.name}</p>
      <span className="text-sm font-bold text-gray-500">
        €&nbsp;{item.price}&nbsp;
        <span>night</span>
      </span>
    </div>
  );
}
