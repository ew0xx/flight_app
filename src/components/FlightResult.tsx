import React from "react";

interface FlightResultProps {
  flight: {
    airline: string;
    departureTime: string;
    departureDate: string;
    departureCity: string;
    departureAirport: string;
    arrivalTime: string;
    arrivalDate: string;
    arrivalCity: string;
    price: number;
    flightTime: string;
  };
}

const FlightResult: React.FC<FlightResultProps> = ({ flight }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4 my-4">
      <div className="border border-gray-300 p-4 rounded-md">
        <div className="text-lg font-medium ">Airline: {flight.airline}</div>
        <div className="text-gray-600 ">
          <span>
            Departure: {flight.departureTime} - {flight.departureDate} -{" "}
            {flight.departureCity}, {flight.departureAirport}
          </span>
        </div>
        <div className="text-gray-600 ">
          <span>
            Arrival : {flight.arrivalTime} - {flight.arrivalDate} -{" "}
            {flight.arrivalCity}, {flight.departureAirport}
          </span>
        </div>
        <div className="text-gray-600 ">
          <span>Flight Duration: {flight.flightTime}</span>
        </div>
      </div>
      <div>Price: {flight.price} $</div>
    </div>
  );
};

export default FlightResult;
