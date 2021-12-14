const FlightRotationService = class FlightRotationService {
  arePlanesGroundedByMidnight = (arrival: number, departure: number) => {
    const midnight = 86400; //seconds in a day

    if ((arrival < midnight) && (departure < midnight)) {
      return true;
    }
    else {
      return false;
    }
  }

  isTurnAroundTimeAtLeastTwentyMinutes = (flightRotation: any, departure: number) => {
    const previousFlightArrivalTime = flightRotation?.arrivaltime;
    const twentyMintuesToSeconds = 1200;

    if (departure >= (previousFlightArrivalTime + twentyMintuesToSeconds)) {
      return true
    }
    else {
      return false;
    }
  }

  isFlightInCorrectCity = (flightRotation: any, departureCity: string) => {
    const previousFlightArrivalCity = flightRotation?.destination;

    if (departureCity === previousFlightArrivalCity) {
      return true;
    }
    else {
      return false;
    }
  }
}

export default new FlightRotationService();