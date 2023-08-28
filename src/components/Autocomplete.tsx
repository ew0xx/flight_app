import React, { useState, useEffect, useRef, ChangeEvent } from "react";

interface Airport {
  code: string;
  name: string;
}

interface AutocompleteProps {
  airports: Airport[];
  onSelect: (airport: Airport) => void;
  airportName: string;
  departureSuggestions?: boolean;
  arrivalSuggestions?: boolean;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  airports,
  onSelect,
  airportName,
  departureSuggestions,
  arrivalSuggestions,
  onInputChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(airportName);
  }, [airportName]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setFilteredAirports([]);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(value.toLowerCase()) ||
        airport.code.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredAirports(filtered);
    onInputChange(event);
  };

  return (
    <div className="relative" ref={autocompleteRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for airports"
        className="w-full bg-white px-4 py-2 rounded-lg shadow-md focus:ring focus:ring-blue-300"
      />
      <ul className="absolute z-10 mt-2 w-full bg-gray-100 rounded-lg shadow">
        {(departureSuggestions || arrivalSuggestions) &&
          filteredAirports.map((airport) => (
            <li
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              key={airport.code}
              onClick={() => {
                onSelect(airport);
                setInputValue(airportName);
                setFilteredAirports([]);
              }}
            >
              {airport.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
