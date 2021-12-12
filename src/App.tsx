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
        console.log('AC', getAircraftInformation)
        setAircraftInformation(getAircraftInformation);
        console.log('info', aircraftInformation)
      }
      catch (err) {
        console.log('Error retrieving aircraft information::App.tsx', err)
      }
    };

    getFlightInformation();
  }, [])

  const getRandomPercentage = (economySeats:number) => {
    const randomNumberOfSeatsTaken = Math.floor(Math.random() * (economySeats - 1) + 1);
    const percentage = Math.floor((randomNumberOfSeatsTaken / economySeats) * 100);
    return `(${percentage} %)`;
  }


  return (
    <div className="App">
      <div className='top-container'></div>

      <div className='flight-info-container'>
        <div className='columns'>
          <div className='aircrafts'>
            <div className='title'>Aircrafts</div>
            <div className='aircraft-list'>
              { aircraftInformation?.data.map((airCraft:any, i: number) => {
                return (
                  <Card key={i}>
                    <CardContent>
                      <div className='card-padding'>
                        <div className='aircraft-name'>
                          {airCraft?.type}  
                        </div>
                        <div className='aircraft-capacity'>
                          {getRandomPercentage(airCraft.economySeats)}  
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              }) }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
