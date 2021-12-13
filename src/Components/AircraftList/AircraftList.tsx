import React from 'react';
import { Card, CardContent, CardHeader } from "../../Common/Components/Card";
import './AircraftList.scss';

/**
 * Props for the component
 */
 export interface AircraftListProps {
  aircraftListData: any;
  flightUtilization: string;
}

/**
 * Renders a Card component
 * @param props The props for the compoonent
 * @returns The component
 */
export const AircraftList = (props: AircraftListProps) => {
  const { aircraftListData, flightUtilization } = props;

  return (
    <div className='aircrafts'>
      <div className='title'>Aircrafts</div>
      <div className='aircraft-list'>
        { aircraftListData?.map((airCraft:any, i: number) => {
          return (
            <Card key={i}>
              <CardHeader>{airCraft?.type}</CardHeader>
              <CardContent>
                <div className='card-padding'>
                  <div className='aircraft-capacity'>
                    {flightUtilization}  
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