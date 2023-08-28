"use client";
import { useState } from "react";
import SearchBox from "@/components/SearchBox";
import FlightList from "@/components/FlightList";
import { fetchFlights } from "@/app/api/mockData";
interface Flight {
  airline: string;
  departureTime: string;
  departureDate: string;
  departureCity: string;
  departureAirport: string;
  arrivalTime: string;
  arrivalDate: string;
  arrivalCity: string;
  arrivalAirport: string;
  flightTime: string;
  price: number;
}
export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [departureAirport, setDepartureAirport] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [arrivalAirport, setArrivalAirport] = useState<string>("");
  const [returnDepartureDate, setReturnDepartureDateDate] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOneWay, setIsOneWay] = useState<boolean>(false);

  const handleSearch = async (searchParams: {
    departure: string;
    arrival: string;
    departureDate: string;
    returnDepartureDate?: string;
    isOneWay: boolean;
  }) => {
    try {
      setLoading(true);
      const fetchedFlights = await fetchFlights(searchParams);

      if (fetchedFlights.length === 0) {
        // Handling empty data
        setFlights([]);
      } else {
        setFlights(fetchedFlights);
        setDepartureAirport(searchParams.departure);
        setArrivalAirport(searchParams.arrival);
        setDepartureDate(searchParams.departureDate);
        setReturnDepartureDateDate(searchParams.returnDepartureDate || "");
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="bg-gray-100 min-h-[calc(100vh-11rem)] p-8">
        <h1 className="text-3xl font-semibold mb-8">
          Flight Search Application
        </h1>
        <SearchBox
          onSearch={(searchParams) => handleSearch(searchParams)}
          setLoading={setLoading}
          isOneWay={isOneWay}
          setIsOneWay={setIsOneWay}
        />
        <FlightList
          flights={flights}
          departureAirport={departureAirport}
          arrivalAirport={arrivalAirport}
          loading={loading}
          departureDate={departureDate}
          arrivalDate={arrivalDate}
          returnDepartureDate={returnDepartureDate}
          isOneWay={isOneWay}
        />
      </div>
    </main>
  );
}
