import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import {
  ArrowRightEndOnRectangleIcon,
  BookmarkIcon,
  MapPinIcon,
} from "@heroicons/react/16/solid";
import {
  createSearchParams,
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  CalendarDateRangeIcon,
  MagnifyingGlassIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useAuth } from "../../context/AuthProvider";

function Header() {
  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1,
  });

  const handleOptions = (name, operation, is) => {
    if (!is) {
      setOptions((prev) => {
        return {
          ...prev,
          [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
        };
      });
    }
  };

  const [openDate, setOpenDate] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const navigate = useNavigate();
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(dateRange),
      destination,
      options: JSON.stringify(options),
    });
    //note : =>  setSearchParams(encodedParams);
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <header className="mb-4 px-2 py-5 border rounded-2xl border-gray-300 flex justify-around items-center min-w-5xl max-w-5xl relative left-1/2 -translate-x-1/2 z-1002">
      <NavLink to="/bookmark" className="flex gap-2 items-center">
        <BookmarkIcon className="size-6 text-purple-500" />
        <span>BookMarks</span>
      </NavLink>
      <span className="text-gray-500 text-lg w-px h-8 bg-gray-400 inline-block"></span>
      <div className="flex items-center">
        <MapPinIcon className="size-6 text-red-500" />
        <input
          type="text"
          placeholder="where to go?"
          className="border-none outline-none pl-3 max-w-xs"
          onChange={(e) => setDestination(e.target.value)}
          value={destination}
        />
      </div>
      <span className="text-gray-500 text-lg w-px h-8 bg-gray-400 inline-block"></span>
      <div className="flex items-center relative">
        <CalendarDateRangeIcon
          id="DateRange"
          className="size-6 text-blue-700 cursor-pointer"
          onClick={() => setOpenDate((is) => !is)}
        />
        <span className="text-xs ml-2 font-semibold select-none">
          {dateRange[0].startDate.toLocaleDateString("en")}
          {" to "}
          {dateRange[0].endDate.toLocaleDateString("en")}
        </span>
        {openDate && (
          <DateRangePicker
            setOpenDate={setOpenDate}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        )}
      </div>
      <span className="text-gray-500 text-lg w-px h-8 bg-gray-400 inline-block"></span>
      <div className="relative">
        <p
          id="Options"
          className="text-xs cursor-pointer select-none"
          onClick={() => setOpenOption((is) => !is)}
        >
          {options.adult} adult &nbsp;&bull;&nbsp; {options.children} children
          &nbsp;&bull;&nbsp; {options.room} room
        </p>
        {openOption && (
          <GroupOptionList
            setOpenOption={setOpenOption}
            options={options}
            handleOptions={handleOptions}
          />
        )}
      </div>
      <span className="text-gray-500 text-lg w-px h-8 bg-gray-400 inline-block"></span>
      <div className="flex gap-2">
        <div
          className="w-8 h-8 bg-blue-700 rounded-md flex justify-center items-center cursor-pointer"
          onClick={handleSearch}
        >
          <MagnifyingGlassIcon className="size-6 text-gray-100" />
        </div>
        <User />
      </div>
    </header>
  );
}

export default Header;

function DateRangePicker({ dateRange, setDateRange, setOpenDate }) {
  const dateRef = useRef("");
  useOutsideClick(dateRef, "DateRange", () => setOpenDate(false));
  return (
    <div ref={dateRef} >
      <DateRange
        className="absolute top-10 -left-20 z-1003"
        editableDateInputs={true}
        onChange={(item) => setDateRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        minDate={new Date()}
      />
    </div>
  );
}

function GroupOptionList({ setOpenOption, options, handleOptions }) {
  const optionRef = useRef("");
  useOutsideClick(optionRef, "Options", () => setOpenOption(false));
  return (
    <div
      ref={optionRef}
      className="absolute top-9 -left-5 w-52 max-w-xs bg-gray-50 px-4 py-2 shadow-lg rounded-lg z-1002"
    >
      <OptionItem
        handleOptions={handleOptions}
        type="adult"
        options={options}
        minLimit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="children"
        options={options}
        minLimit={0}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="room"
        options={options}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ handleOptions, type, options, minLimit }) {
  const disabled = minLimit >= options[type];
  return (
    <div className="flex justify-between mb-2">
      <span className="text-sm text-gray-600 font-bold">{type}</span>
      <div className="flex justify-between items-center w-1/2">
        <MinusCircleIcon
          onClick={() => handleOptions(type, "dec", disabled)}
          className={`size-6  ${
            disabled
              ? "text-gray-600 cursor-not-allowed "
              : "text-red-600 cursor-pointer"
          }
          `}
        />
        <span className="text-sm font-bold">{options[type]}</span>
        <PlusCircleIcon
          onClick={() => handleOptions(type, "inc")}
          className="size-6 text-green-600 cursor-pointer"
        />
      </div>
    </div>
  );
}

function User() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handlerLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return !isAuthenticated ? (
    <Link
      to="/login"
      className="w-8 h-8 bg-green-600 rounded-md flex justify-center items-center cursor-pointer"
    >
      <UserIcon className="size-6 text-gray-100" />
    </Link>
  ) : (
    <div
      onClick={handlerLogout}
      className="w-8 h-8 bg-red-600 rounded-md flex justify-center items-center cursor-pointer"
    >
      <ArrowRightEndOnRectangleIcon className="size-6 text-gray-100" />
    </div>
  );
}
