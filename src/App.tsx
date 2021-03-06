import React, { useEffect, useState } from 'react';
import FlightService from './Services/FlightService';
import { AircraftList } from './Components/AircraftList/AircraftList';
import { FlightList } from './Components/FlightList/FlightList';
import { FlightRotationList } from './Components/FlightRotationList/FlightRotationList';
import './App.scss';
import FlightRotationService from './Services/FlightRotationService';

export default function App() {
  const [aircraftInformation, setAircraftInformation] = useState<any>();
  const [flightInformation, setFlightInformation] = useState<any>();
  const [flightRotations, setFlightRotations] = useState<any>([]);
  const [flightUtilization, setFlightUtilizaion] = useState<string>('0%');
  const flightService = FlightService;
  const flightRotationService = FlightRotationService;

  useEffect(() => {
    const getAircraftInformation = async () => {
      try {
        const getAircraftInformationApiResult = await flightService.getAirCrafts();
        setAircraftInformation(getAircraftInformationApiResult.data);
      }
      catch (err) {
        console.log('Error retrieving aircraft information::App.tsx', err)
      }
    };

    const getFlightInformation = async () => {
      try {
        const getFlightInformationApiResult = await flightService.getFlights();
        setFlightInformation(getFlightInformationApiResult.data);
      }
      catch (err) {
        console.log('Error retrieving flight information::App.tsx', err)
      }
    }

    getAircraftInformation();
    getFlightInformation();
  }, [])

  const getFlightUtilization = (rotationArray: any) => {
    const secondsInDay = 86400;
    const totalSecondsOfFlightTime = rotationArray.reduce((a:any,b:any) => {
      return a + (b.arrivaltime - b.departuretime);
    }, 0);

    const percentage = Math.floor((totalSecondsOfFlightTime / secondsInDay) * 100);
    setFlightUtilizaion(`${percentage}%`);
    setFlightRotations(rotationArray);
  }

  const removeSelectedFlightFromFlightList = (selectedFlightId: string) => {
    const flightListWithRemovedFlight = flightInformation.filter((flight: any) => selectedFlightId != flight.id);
    setFlightInformation(flightListWithRemovedFlight);
  };

  const addFlightToRotation = (flightInfo: any) => {
    if (flightRotations.length > 0) {

      // Check to make sure arrival time is before midnight
      if (flightRotationService.arePlanesGroundedByMidnight(flightInfo.arrivaltime, flightInfo.departuretime)) {
        // Check to make sure turnaround time is at least 20 minutes
        if (flightRotationService.isTurnAroundTimeAtLeastTwentyMinutes(flightRotations[flightRotations.length - 1], flightInfo.departuretime)) {
          // Check to make sure the departure city is the same as the arrival of the previous flight
          if (flightRotationService.isFlightInCorrectCity(flightRotations[flightRotations.length - 1], flightInfo.origin)) {
            const flightRotationsArray = [
              ...flightRotations, 
              flightInfo
            ]
      
            getFlightUtilization(flightRotationsArray);
            removeSelectedFlightFromFlightList(flightInfo.id);
          }
          else {
            alert(`The plane is not currently in that city! Please select a city that has ${flightRotations[flightRotations.length - 1].destination} as the departure city`)
          }
        }
        else {
          alert(`The plane needs more time to prepare for the next flight! Please select a flight that has more than 20 minutes between arrival time and departure time`)
        }
      }
      else {
        alert(`The plane needs to be grounded by midnight!`)
      }
    }
    else {
      const flightRotationsArray = [
        ...flightRotations, 
        flightInfo
      ]

      getFlightUtilization(flightRotationsArray);
      removeSelectedFlightFromFlightList(flightInfo.id);
    }
  };


  return (
    <div className="App">
      <div className='top-container'></div>
      <div className='flight-info-container'>
        <div className='columns'>
          <AircraftList aircraftListData={aircraftInformation} flightUtilization={flightUtilization} />
          <FlightRotationList flightRotationData={flightRotations} />
          <FlightList
            flightListData={flightInformation} 
            addFlightHandler={addFlightToRotation} 
            lastSelectedFlight={flightRotations[flightRotations.length - 1]}
          />
        </div>
      </div>
    </div>
  );
}
