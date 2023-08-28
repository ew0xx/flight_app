import React, { useState, ChangeEvent } from "react";
import Autocomplete from "@/components/Autocomplete";
import { mockAirports } from "@/app/api/mockData";
interface Airport {
  code: string;
  name: string;
}
interface SearchBoxProps {
  onSearch: (searchParams: {
    departure: string;
    arrival: string;
    departureDate: string;
    returnDepartureDate?: string;
    isOneWay: boolean;
  }) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOneWay: React.Dispatch<React.SetStateAction<boolean>>;
  isOneWay: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  setLoading,
  isOneWay,
  setIsOneWay,
}) => {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureDate, setDepartureDate] = useState(getTodayDate());
  const [returnDepartureDate, setReturnDepartureDate] = useState(
    getTodayDate()
  );
  const [departureSuggestions, setDepartureSuggestions] = useState(true);
  const [arrivalSuggestions, setArrivalSuggestions] = useState(true);

  const handleSelectDeparture = (airport: Airport) => {
    setDeparture(airport.name);
    setDepartureSuggestions(false);
  };

  const handleSelectArrival = (airport: Airport) => {
    setArrival(airport.name);
    setArrivalSuggestions(false);
  };

  const handleDepartureInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeparture(event.target.value);
    setDepartureSuggestions(true);
  };

  const handleArrivalInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArrival(event.target.value);
    setArrivalSuggestions(true);
  };

  const handleSearch = () => {
    setLoading(true);

    // Perform input validation
    if (
      !departure ||
      !arrival ||
      !departureDate ||
      (!isOneWay && !returnDepartureDate)
    ) {
      alert("Please fill in all fields");
      return;
    }

    onSearch({
      departure,
      arrival,
      departureDate,
      returnDepartureDate: isOneWay ? undefined : returnDepartureDate,
      isOneWay,
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-4">
      <label className="block text-sm font-medium text-gray-700 ">
        Departure Airport
      </label>
      <Autocomplete
        airports={mockAirports}
        onSelect={handleSelectDeparture}
        airportName={departure}
        departureSuggestions={departureSuggestions}
        onInputChange={handleDepartureInputChange}
      />
      <label className="block text-sm font-medium text-gray-700 ">
        Arrival Airport
      </label>
      <Autocomplete
        airports={mockAirports}
        onSelect={handleSelectArrival}
        airportName={arrival}
        arrivalSuggestions={arrivalSuggestions}
        onInputChange={handleArrivalInputChange}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-2">
            Departure Date
          </label>
          <input
            className="w-full bg-white px-4 py-2 rounded-lg shadow-md focus:ring focus:ring-blue-300"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
        {!isOneWay && (
          <div>
            <label className="block text-sm font-medium text-gray-700 pb-2">
              Return Departure Date
            </label>
            <input
              className="w-full bg-white px-4 py-2 rounded-lg shadow-md focus:ring focus:ring-blue-300"
              type="date"
              value={returnDepartureDate}
              onChange={(e) => setReturnDepartureDate(e.target.value)}
            />
          </div>
        )}
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isOneWay}
          onChange={() => setIsOneWay(!isOneWay)}
        />
        One-way flight
      </label>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
