import React, { useEffect, useState } from 'react';
import './App.scss';
import { Card, CardContent } from './Common/Card';
import FlightService from './Services/FlightService';

export default function App() {
  const [aircraftInformation, setAircraftInformation] = useState<any>();
  const flightService = FlightService;

  useEffect(() => {
    const getFlightInformation = async () => {
      try {
        const getAircraftInformation = await flightService.getAirCrafts();
        setAircraftInformation(getAircraftInformation);
      }
      catch (err) {
        console.log('Error retrieving aircraft information::App.tsx', err)
      }
    };

    getFlightInformation();
  }, [])


  return (
    <div className="App">
      <Card>
        <CardContent>
          TEST

        </CardContent>
      </Card>
    </div>
  );
}
