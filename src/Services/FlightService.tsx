import axios, {Axios} from 'axios';
import { AirCraftResponse } from '../APIResponses/AirCraftResponse';

const FlightService = class FlighService {
  async getAirCrafts() {
    try {
     const result = await axios.get('https://infinite-dawn-93085.herokuapp.com/aircrafts');
     console.log('res', result.data)
     return result.data;
        // .then((response: any) => {
        //   console.log('aircraft response', response.data);
        //   return response.data;
        // })
    }
    catch (err) {
      console.log('Error retrieving aircraft information::FlightService.tsx', err)
    }
  }
}

export default new FlightService();