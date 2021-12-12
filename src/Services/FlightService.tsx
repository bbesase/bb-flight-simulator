import axios, {Axios} from 'axios';
import { AirCraftResponse } from '../APIResponses/AirCraftResponse';

const FlightService = class FlighService {
  async getAirCrafts() {
    try {
     const result = await axios.get('https://infinite-dawn-93085.herokuapp.com/aircrafts');
     return result.data;
    }
    catch (err) {
      console.log('Error retrieving aircraft information::FlightService.tsx', err)
    }
  }

  async getFlights() {
    try {
     const result = await axios.get('https://infinite-dawn-93085.herokuapp.com/flights');
     return result.data;
    }
    catch (err) {
      console.log('Error retrieving flight information::FlightService.tsx', err)
    }
  }
}

export default new FlightService();