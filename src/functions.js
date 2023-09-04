const addMinutes = (date, minutes) => {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  },
  getAvailableRides = (destination, pickupLocation, rideTime, nearByAddresses, allRides) => {
    const dateObjRideTime = new Date(rideTime).getTime(),
        minDateTimeBound = addMinutes(new Date(rideTime), -30).getTime(),
        maxDateTimeBound = addMinutes(new Date(rideTime), 30).getTime();
    const filtered = allRides.filter(item => {
        if (item) {
          const addressObj = nearByAddresses.find(x => x.address.toLowerCase() == pickupLocation.toLowerCase())
          const isNearBy = addressObj && addressObj.nearBy.includes(item.startAddress.toLowerCase())
          const rideStartTime = new Date(item.dateTime).getTime()
          return item.destination == destination &&
                  minDateTimeBound <= rideStartTime &&
                  rideStartTime < maxDateTimeBound && item.status == 'scheduled' &&
                  item.availableSeats > 0
        }
    });
    return filtered;
    
  }

export {
    getAvailableRides
}