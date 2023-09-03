const userProfile = {
    username: '',
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    shiftTime: '',
    homeAddress: '',
    officeAddress: '',
    vehicleBrand: '',
    vehicleModel: '',
    fuelType: '',
    seats: ''
  },
  zeroPad = num => String(num).padStart(2, "0"),
  getTimeCount = () => {
    const times = [];
    for (let i = 1; i < 24; i++) {
      times.push(zeroPad(i));
    }
    return times;
  },
  timeCount = getTimeCount(),
  shiftTimes = ['9AM-6PM', '1PM-9PM', '3PM-10PM'],
  vehicleBrands = ['Maruti', 'Toyota', 'Mahindra', 'Hyundai'],
  vehicleModels = ['Hatchback', 'Sedan', 'SUV'],
  fuelTypes = ['Petrol', 'Diesel', 'CNG', 'EV'],
  seatsArr = [1, 2, 3, 4, 5, 6],
  offices = [
    {
      id: 1,
      address: 'Sector 24'
    },
    {
      id: 2,
      address: 'Sector 25'
    },
    {
      id: 3,
      address: 'Sector 26'
    },
    {
      id: 4,
      address: 'Sector 27'
    }
  ],
  generateId = () => {
    return "id" + Math.random().toString(16).slice(2)
  },
  nearByAddresses = [{
    address: 'sector 57',
    nearBy: ['sector 56', 'sector 55', 'sector 78']
  }]

export {
  userProfile,
  timeCount,
  shiftTimes,
  vehicleBrands,
  vehicleModels,
  fuelTypes,
  seatsArr,
  offices,
  generateId,
  nearByAddresses
}