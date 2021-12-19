import {render, cleanup} from '@testing-library/react';
import { AircraftList } from './AircraftList';


afterEach(cleanup);

test('renders "Loading Aircraft Data..." when there are no aircrafts', () => {
  const {getByText} = render(<AircraftList aircraftListData={null} flightUtilization={''}/>)
  expect(getByText(/Aircrafts/i)).toBeInTheDocument();
  expect(getByText(/Loading Aircraft Data.../i)).toBeInTheDocument();
})