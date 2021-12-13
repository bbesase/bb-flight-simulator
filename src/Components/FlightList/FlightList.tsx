import React from 'react';
import { Card, CardContent, CardHeader } from "../../Common/Components/Card";
import './FlightList.scss';

/**
 * Props for the component
 */
 export interface FlightListProps {
  flightListData: any;
  addFlightHandler: (flight: any) => void;
}

/**
 * Renders a Card component
 * @param props The props for the compoonent
 * @returns The component
 */
export const FlightList = (props: FlightListProps) => {
  const { flightListData, addFlightHandler } = props;

  return (
    <div className='flights'>
      <div className='title'>Flights</div>
      <div className='flight-list'>
        { flightListData?.map((flight:any, i: number) => {
          return (
            <Card key={i} onCardClick={() => addFlightHandler(flight)}>
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
        }) }
      </div>
    </div>
  )
};