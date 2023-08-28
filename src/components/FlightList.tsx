import React, { useState, useEffect } from "react";
import FlightResult from "./FlightResult";
import LoadingAnimation from "@/components/LoadingAnimation";

export interface Flight {
  airline: string;
  departureTime: string;
  departureDate: string;
  departureCity: string;
  departureAirport: string;
  arrivalAirport: string;
  arrivalTime: string;
  arrivalDate: string;
  arrivalCity: string;
  price: number;
  flightTime: string;
}

interface FlightListProps {
  flights: Flight[];
  departureAirport: string;
  returnDepartureDate: string;
  arrivalAirport: string;
  loading: boolean;
  departureDate: string;
  arrivalDate: string;
  isOneWay: boolean;
}

const FlightList: React.FC<FlightListProps> = ({
  flights,
  departureAirport,
  arrivalAirport,
  loading,
  departureDate,
  arrivalDate,
  returnDepartureDate,
  isOneWay,
}) => {
  const [sortedFlights, setSortedFlights] = useState<Flight[]>([]);
  const [sortedReturnFlights, setSortedReturnFlights] = useState<Flight[]>([]);
  const [sortType, setSortType] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [returnSortType, setReturnSortType] = useState("");
  const [returnSortOrder, setReturnSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (type: keyof Flight) => {
    let sorted: Flight[];

    if (type === sortType) {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
      sorted = [...sortedFlights].sort((a, b) => {
        if (newSortOrder === "asc") {
          return a[type] > b[type] ? 1 : -1;
        } else {
          return a[type] < b[type] ? 1 : -1;
        }
      });
    } else {
      setSortType(type);
      setSortOrder("asc");
      sorted = [...sortedFlights].sort((a, b) => {
        return a[type] > b[type] ? 1 : -1;
      });
    }

    setSortedFlights(sorted);
  };

  const getSortIcon = (type: keyof Flight) => {
    if (type === sortType) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };
  const handleReturnSort = (type: keyof Flight) => {
    let sorted: Flight[];

    if (type === returnSortType) {
      const newSortOrder = returnSortOrder === "asc" ? "desc" : "asc";
      setReturnSortOrder(newSortOrder);
      sorted = [...sortedReturnFlights].sort((a, b) => {
        if (newSortOrder === "asc") {
          return a[type] > b[type] ? 1 : -1;
        } else {
          return a[type] < b[type] ? 1 : -1;
        }
      });
    } else {
      setReturnSortType(type);
      setReturnSortOrder("asc");
      sorted = [...sortedReturnFlights].sort((a, b) => {
        return a[type] > b[type] ? 1 : -1;
      });
    }

    setSortedReturnFlights(sorted);
  };

  const getReturnSortIcon = (type: keyof Flight) => {
    if (type === returnSortType) {
      return returnSortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  useEffect(() => {
    const filteredFlights = flights.filter(
      (flight) =>
        (!departureAirport || flight.departureAirport === departureAirport) &&
        (!arrivalAirport || flight.arrivalAirport === arrivalAirport) &&
        (!departureDate || flight.departureDate === departureDate) &&
        (!arrivalDate || flight.arrivalDate === arrivalDate)
    );

    if (!isOneWay) {
      const returnFlights = flights.filter(
        (flight) =>
          flight.departureAirport === arrivalAirport &&
          flight.arrivalAirport === departureAirport &&
          (!returnDepartureDate || flight.departureDate === returnDepartureDate)
      );
      setSortedReturnFlights(returnFlights);
    } else {
      setSortedReturnFlights([]);
    }

    setSortedFlights(filteredFlights);
  }, [
    flights,
    departureAirport,
    arrivalAirport,
    departureDate,
    arrivalDate,
    returnDepartureDate,
    isOneWay,
  ]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4 my-4">
      {loading ? (
        <LoadingAnimation />
      ) : flights.length > 0 ? (
        <div className="flex">
          {/* Outgoing flights */}
          <div className="w-1/2 pr-2">
            {flights.length > 0 && (
              <div className="flex items-center justify-end">
                <button
                  onClick={() => handleSort("price")}
                  className={`mr-4 ${
                    sortType === "price"
                      ? "text-blue-500 underline"
                      : "text-gray-700"
                  }`}
                >
                  Sort by Price {getSortIcon("price")}
                </button>
                <button
                  onClick={() => handleSort("departureTime")}
                  className={`mr-4 ${
                    sortType === "departureTime"
                      ? "text-blue-500 underline"
                      : "text-gray-700"
                  }`}
                >
                  Sort by Departure Time {getSortIcon("departureTime")}
                </button>
                <button
                  onClick={() => handleSort("arrivalTime")}
                  className={`mr-4 ${
                    sortType === "arrivalTime"
                      ? "text-blue-500 underline"
                      : "text-gray-700"
                  }`}
                >
                  Sort by Arrival Time {getSortIcon("arrivalTime")}
                </button>
                <button
                  onClick={() => handleSort("flightTime")}
                  className={`mr-4 ${
                    sortType === "flightTime"
                      ? "text-blue-500 underline"
                      : "text-gray-700"
                  }`}
                >
                  Sort by Flight Time {getSortIcon("flightTime")}
                </button>
              </div>
            )}
            <h2 className="text-lg font-bold text-gray-700 text-center m-4">
              Outgoing Flights
            </h2>
            {sortedFlights.map((flight, index) => (
              <FlightResult key={index} flight={flight} />
            ))}
          </div>
          {/* Return flights */}
          {!isOneWay && (
            <div className="w-1/2 pl-2">
              <div className="flex items-center justify-end">
                <button
                  onClick={() => handleReturnSort("price")}
                  className={`mr-4 ${
                    returnSortType === "price"
                      ? "text-blue-500 underline"
                      : "text-gray-700"
                  }`}
                >
                  Sort by Price {getReturnSortIcon("price")}
                </button>
                <button
                  onClick={() => handleReturnSort("departureTime")}
                  className={`mr-4 ${
                    returnSortType === "departureTime"
                      ? "text-blue-500 underline"
                      : "text-gray-700"
                  }`}
                >
                  Sort by Departure Time {getReturnSortIcon("departureTime")}
                </button>
                <button
                  onClick={() => handleReturnSort("arrivalTime")}
                  className={`mr-4 ${
                    returnSortType === "arrivalTime"
                      ? "text-blue-500 underline"
                      : "text-gray-700"
                  }`}
                >
                  Sort by Arrival Time {getReturnSortIcon("arrivalTime")}
                </button>
                <button
                  onClick={() => handleReturnSort("flightTime")}
                  className={`mr-4 ${
                    returnSortType === "flightTime"
                      ? "text-blue-500 underline"
                      : "text-gray-700"
                  }`}
                >
                  Sort by Flight Time {getReturnSortIcon("flightTime")}
                </button>
              </div>
              <h2 className="text-lg font-bold text-gray-700 text-center m-4">
                Return Flights
              </h2>
              {sortedReturnFlights.map((flight, index) => (
                <FlightResult key={index} flight={flight} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
};

export default FlightList;
