import axios, {Axios} from 'axios';
import { AirCraftResponse } from '../APIResponses/AirCraftResponse';

const FlightService = class FlighService {
  async getAirCrafts() {
    try {
      axios.get('https://infinite-dawn-93085.herokuapp.com/aircrafts')
        .then((response: any) => {
          console.log('aircraft response', response.data);
          return response.data;
        })
    }
    catch (err) {
      console.log('Error retrieving aircraft information::FlightService.tsx', err)
    }
  }
}

export default new FlightService();