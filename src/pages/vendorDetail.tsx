import {Box,FormControl,Grid,InputLabel,Link,MenuItem,OutlinedInput,Select} from "@mui/material"
import React from "react";
import {useParams} from "react-router-dom"
import {IGlobalProp,IState,IVendor} from "../interfaces";
import {APITalkService} from "../services";
import {API_URL,ROOTRESOURCESTYPES} from "../shared";
import underscore from "underscore";
import {FloristForm, VenueResourceInfoForm} from "../shared/vendorDetailForms";

export const VendorDetail=(props: IGlobalProp) => {
    let {uuid}=useParams();
    const [vendorInfo,setVendorInfo]=React.useState<IVendor>();
    const [cities,setCities]=React.useState<string[]>([])

    console.log("State in props",props)
    React.useEffect(() => {
        if(uuid) {
            new APITalkService().get(`${API_URL}/vendors/getVendorDetails/${uuid}`).then((response) => {
                setVendorInfo(response.data.data)
            });
        }
    },[uuid]);

    const getCities=(state: string) => {
        new APITalkService().get(`${API_URL}/masterData/cities/${state}`).then((response) => {
            const onlyCities=response.data.data.map((d: IState) => d.city_name);
            const uniqData=underscore.uniq(onlyCities);
            setCities(uniqData);
        })
    }

    function renderFormConditionally(resourceName: string): React.ReactNode {
        console.log("resourceName",resourceName)
        if(resourceName===ROOTRESOURCESTYPES.FLORISTS) {
            return <FloristForm uuid={uuid!} states={props.states} cities={cities} vendorInfo={vendorInfo} getCities={getCities} />
        }
        if(resourceName === ROOTRESOURCESTYPES.VENUE) {
            return <VenueResourceInfoForm uuid={uuid!} states={props.states} cities={cities} vendorInfo={vendorInfo} getCities={getCities} />
        }
    }

    return (
        <Box paddingX={5} paddingY={5}>
            <Link color="#000" href={""} style={{backgroundColor: 'yellow',padding: 5,fontWeight: 'bold'}}>
                Vendor Name: {vendorInfo?.firstName} {vendorInfo?.lastName}
            </Link>
            <Link color="#000" href={""} style={{backgroundColor: 'yellow',padding: 5,fontWeight: 'bold'}}>
                Vendor Email: {vendorInfo?.email}
            </Link>

            {
                renderFormConditionally(vendorInfo?.resourceInfo?.vendorResourceType!)
            }
        </Box>
    )
}