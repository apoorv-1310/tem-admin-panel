export interface IVenueResourceInfo {
  vendorId: string;
  name: string;
  phoneNo: string;
  address: string;
  googleMapsLink: string;
  yearOfEstablishment: string;
  city: string;
  state: string;
  country: string;
  logo: string;
  isNearToAirport: boolean;
  isNearToRailwayStation: boolean;
  hasGuestRooms: boolean;
  hasPowerBackup: boolean;
  hasPark: boolean;
  guestRoomsCount: number;
  hasMatresses: boolean;
  hasCabPickupService: boolean;
  hasHalogens: boolean;
  totalSeatingCapacity: number;
  isOnRoad: boolean;
  createdOn: string;
}
