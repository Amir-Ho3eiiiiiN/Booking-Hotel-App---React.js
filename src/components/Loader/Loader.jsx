import { LoaderIcon } from "react-hot-toast";

function Loader() {
  return (
    <div className="flex items-center gap-2">
      <p> Loading Data...</p>
      <LoaderIcon className="!size-5" />
    </div>
  );
}

export default Loader;
