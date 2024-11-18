import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../../context/HotelsProvider";

function MapsLayout() {
  const { hotels } = useHotels();
  return (
    <div className="w-full flex content-container">
      <div className="flex-1 p-0 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-900 ">
        <Outlet />
      </div>
      <div className="flex-1 p-0 relative">
          <Map markerLocations={hotels} />
      </div>
    </div>
  );
}

export default MapsLayout;
