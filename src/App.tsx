import React, { useEffect, useState } from 'react';
import './App.scss';
import { Card, CardContent } from './Common/Card';
import FlightService from './Services/FlightService';
import RIGHT_ARROW from './images/arrow.png';

export default function App() {
  const [aircraftInformation, setAircraftInformation] = useState<any>();
  const [flightInformation, setFlightInformation] = useState<any>();
  const [flightRotations, setFlightRotations] = useState<any>([]);
  const flightService = FlightService;

  useEffect(() => {
    const getAircraftInformation = async () => {
      try {
        const getAircraftInformationApiResult = await flightService.getAirCrafts();
        setAircraftInformation(getAircraftInformationApiResult);
      }
      catch (err) {
        console.log('Error retrieving aircraft information::App.tsx', err)
      }
    };

    const getFlightInformation = async () => {
      try {
        const getFlightInformationApiResult = await flightService.getFlights();
        setFlightInformation(getFlightInformationApiResult);
      }
      catch (err) {
        console.log('Error retrieving flight information::App.tsx', err)
      }
    }

    getAircraftInformation();
    getFlightInformation();
  }, [])

  const getRandomPercentage = (economySeats:number) => {
    const randomNumberOfSeatsTaken = Math.floor(Math.random() * (economySeats - 1) + 1);
    const percentage = Math.floor((randomNumberOfSeatsTaken / economySeats) * 100);
    return `(${percentage} %)`;
  }

  const addFlightToRotation = (flightInfo: any) => {
    setFlightRotations(
      [
        ...flightRotations, 
        flightInfo
      ]
    )
  };


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

          <div className='rotation'>
            <div className='title'>Rotations</div>
            <div className='rotation-list'>
              {flightRotations?.map((rotation: any, i: number) => {
                return (
                  <Card key={i}>
                    <CardContent>
                      <div className='card-padding'>
                        <div className='flight-information'>
                          Flight: {rotation.id} 
                        </div>
                        <div className='flight-data'>
                          <div className='origin'>
                            <div>{rotation.origin}</div>
                            <div>{rotation.readable_departure}</div>
                          </div>  
                          <div className='arrow'>
                            <img src={RIGHT_ARROW} />
                          </div>
                          <div className='destination'>
                            <div>{rotation.destination}</div>
                            <div>{rotation.readable_arrival}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
                }) }
            </div>
          </div>

          <div className='flights'>
            <div className='title'>Flights</div>
            <div className='flight-list'>
              { flightInformation?.data.map((flight:any, i: number) => {
                return (
                  <Card key={i} onCardClick={() => addFlightToRotation(flight)}>
                    <CardContent>
                      <div className='card-padding'>
                        <div className='flight-name'>
                          {flight?.id}  
                        </div>
                        <div className='flight-locations'>
                          <div className='left'>{flight.origin}</div>  
                          <div className='right'>{flight.destination}</div>
                        </div>

                        <div className='flight-times'>
                          <div className='left'>{flight.readable_departure}</div>  
                          <div className='right'>{flight.readable_arrival}</div>
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
