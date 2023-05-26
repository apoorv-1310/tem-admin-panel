export interface IVendor {
  uuid?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNo: string;
  avatar: string;
  createdOn?: string;
  country: string;
  city: string;
  state: string;
  resourceTypeId: string;
  resourceInfo?: {
    createdOn: string;
    isActive: boolean;
    uuid: string;
    vendorResourceType: string;
    _id: string;
  };
}
