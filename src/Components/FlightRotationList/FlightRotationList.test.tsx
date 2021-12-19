import {render, cleanup} from '@testing-library/react';
import { FlightRotationList } from './FlightRotationList';


afterEach(cleanup);

test('renders "Loading Aircraft Data..." when there are no aircrafts', () => {
  const {getByText} = render(<FlightRotationList flightRotationData={null}/>)
  expect(getByText(/Rotations/i)).toBeInTheDocument();
  expect(getByText(/Select a flight to add to the rotation/i)).toBeInTheDocument()
});

test('renders flight rotation list', () => {
  const mockFlightRotationData = [
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

  const {container,getAllByTestId} = render(<FlightRotationList flightRotationData={mockFlightRotationData}/>)
  expect(container.lastChild).not.toBeNull()
})