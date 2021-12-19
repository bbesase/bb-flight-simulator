import '@testing-library/jest-dom';
import {render, cleanup} from '@testing-library/react';
import { Card, CardContent, CardHeader } from '../../Common/Components/Card';
import { FlightList } from './FlightList';


afterEach(cleanup);

test('renders "Loading Flight Data..." when there are no flights', () => {
  const {getByText} = render(<FlightList flightListData={null} addFlightHandler={() => console.log('hi')} lastSelectedFlight={{}}/>)
  expect(getByText(/Loading Flight Data.../i)).toBeInTheDocument();
  expect(getByText(/Flights/i)).toBeInTheDocument();
});

test('renders flight list', () => {
  const mockFlightData = [
    {
      "id": "AS1002",
      "departuretime": 27900,
      "arrivaltime": 32100,
      "readable_departure": "07:45",
      "readable_arrival": "08:55",
      "origin": "LFMN",
      "destination": "LFSB"
    }
  ];

  const {container,getAllByTestId} = render(<FlightList flightListData={mockFlightData} addFlightHandler={() => console.log('hi')} lastSelectedFlight={{}}/>)
  expect(container.lastChild).not.toBeNull()
})