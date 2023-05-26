import { IVendor } from "./IVendor";
import { IVendorResourceType } from "./IVendorResourcesType";
import { IVenueResourceInfo } from "./IVenueResourceInfo";

export interface IVendorResourceDetails {
  vendorDetails: IVendor;
  resourceInfo: IVendorResourceType;
  associatedResourceInfo: IVenueResourceInfo;
}
