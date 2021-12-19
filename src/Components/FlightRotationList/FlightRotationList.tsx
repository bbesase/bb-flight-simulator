import React from 'react';
import { Card, CardContent } from "../../Common/Components/Card";
import RIGHT_ARROW from '../../images/arrow.png';
import './FlightRotationList.scss';

/**
 * Props for the component
 */
 export interface FlightRotationListProps {
  flightRotationData: any;
}

/**
 * Renders a Card component
 * @param props The props for the compoonent
 * @returns The component
 */
export const FlightRotationList = (props: FlightRotationListProps) => {
  const { flightRotationData } = props;

  return (
    <div className='rotation'>
      <div className='title'>Rotations</div>
      <div className='rotation-list'>
        { flightRotationData ? (
          flightRotationData?.map((rotation: any, i: number) => {
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
            }))
          :
            <div className='placeholder'>Select a flight to add to the rotation</div>

        }
        
      </div>
    </div>
  )
};