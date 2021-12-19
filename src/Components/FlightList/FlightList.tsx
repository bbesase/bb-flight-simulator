import React from 'react';
import { Card, CardContent, CardHeader } from "../../Common/Components/Card";
import FlightRotationService from '../../Services/FlightRotationService';
import './FlightList.scss';

/**
 * Props for the component
 */
 export interface FlightListProps {
  flightListData: any;
  addFlightHandler: (flight: any) => void;
  canAddToFlightRotation?: boolean;
  lastSelectedFlight: any;
}

/**
 * Renders a Card component
 * @param props The props for the compoonent
 * @returns The component
 */
export const FlightList = (props: FlightListProps) => {
  const { flightListData, addFlightHandler, canAddToFlightRotation, lastSelectedFlight } = props;
  const flightRotationService = FlightRotationService;

  const isFlightAvailableToAdd = (flight: any) => {
    // if there is a selected flight...
    if (lastSelectedFlight) {
      // check to make sure we can add the flight
      if (
        flightRotationService.arePlanesGroundedByMidnight(flight.arrivaltime, flight.departuretime) &&
        flightRotationService.isFlightInCorrectCity(lastSelectedFlight, flight.origin) &&
        flightRotationService.isTurnAroundTimeAtLeastTwentyMinutes(lastSelectedFlight, flight.departuretime)
      )
      {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return true;
    }
  };

  return (
    <div className='flights'>
      <div className='title'>Flights</div>
      <div data-testid="flight-list" className='flight-list'>
        { flightListData ? (
          flightListData?.map((flight:any, i: number) => {
            return (
              <Card data-testid="flight-card" key={i} onCardClick={() => addFlightHandler(flight)} canAddFlightRotation={isFlightAvailableToAdd(flight)}>
                <CardHeader>{flight?.id}</CardHeader>
                <CardContent>
                  <div className='card-padding'>
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
          })) 
      :
        <div className='placeholder'>Loading Flight Data...</div> 
      }
      </div>
    </div>
  )
};