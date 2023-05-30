import {Button,FormControl,FormControlLabel,FormLabel,Grid,InputLabel,MenuItem,OutlinedInput,Select,Switch,ToggleButton} from "@mui/material"
import React from "react";
import {IVendor,IVendorResourceDetails,IVenueResourceInfo} from "../../interfaces";
import {APITalkService} from "../../services";
import {API_URL} from "../constants";
import axios from "axios";

interface IVenueResourceInfoFormProps {
    uuid: string;
    states: Array<string>;
    cities: Array<string>;
    vendorInfo: IVendor|undefined;
    getCities: (stateName: string) => void;
}

export const VenueResourceInfoForm=(props: IVenueResourceInfoFormProps) => {
    const {
        uuid,
        states,
        cities,
        vendorInfo,
        getCities
    }=props
    const [venueResourceInfo,setVenueResourceInfo]=React.useState<IVenueResourceInfo>({
        uuid: undefined,
        vendorId: uuid,
        name: "",
        phoneNo: "",
        address: "",
        googleMapsLink: "",
        yearOfEstablishment: "",
        city: "",
        state: "",
        country: "india",
        logo: "",
        createdOn: "",
        isNearToAirport: false,
        isNearToRailwayStation: false,
        hasGuestRooms: false,
        hasPowerBackup: false,
        hasPark: false,
        guestRoomsCount: 0,
        hasMatresses: false,
        hasCabPickupService: false,
        hasHalogens: false,
        totalSeatingCapacity: 10,
        isOnRoad: false,
    });

    React.useEffect(() => {
        getVendorAndResourceInfo()
    },[]);
    console.log("states",states)

    const getVendorAndResourceInfo=() => {
        new APITalkService().get(`${API_URL}/vendors/getVendorResourceDetails/${uuid}`,true)
            .then((response) => {
                const responseData: IVendorResourceDetails=response.data.data;
                setVenueResourceInfo({
                    ...responseData.associatedResourceInfo,
                })
                if(responseData.associatedResourceInfo&&responseData.associatedResourceInfo.state) {
                    getCities(responseData.associatedResourceInfo.state)
                } else {
                    // getAllStates()
                }
                console.log("response",response)
            }).catch((error) => {
                console.log("error",error)
            })
    }

    const saveVenueResource=() => {
        new APITalkService().post(`${API_URL}/venues/addVenue`,{
            ...venueResourceInfo,
            country: 'india',
            address: venueResourceInfo.address,
            vendorId: uuid
        },true)
            .then((response) => {
                console.log("response",response);
                getVendorAndResourceInfo()
            }).catch((error) => {
                console.log("error",error)

            })
    }

    const setvenueResourceValue=(field: string,value: string): void => {
        setVenueResourceInfo({
            ...venueResourceInfo,
            [field]: value
        })
    }

    const handleToggleSwitch=(checked: boolean,field: string) => {
        setVenueResourceInfo({
            ...venueResourceInfo,
            [field]: checked
        })
    }

    const uploadMedia=(event: any) => {
        var bodyFormData=new FormData();
        console.log("event",event.target.files[0])
        bodyFormData.append('image',event.target.files[0]);
        axios({
            method: "post",
            url: `${API_URL}/masterData/uploadImage?resourceInfoId=${venueResourceInfo.uuid}&vendorId=${uuid}&caption=logo`,
            data: bodyFormData,
            headers: {"Content-Type": "multipart/form-data",token: 'abcd'},
        })
            .then(function(response) {
                //handle success
                console.log(response);
                setVenueResourceInfo({
                    ...venueResourceInfo,
                    logo: response.data.fileInfo.filename
                })
            })
            .catch(function(response) {
                //handle error
                console.log(response);
            });
    }

    const getFileUrl=(fileName: string): string => {
        if(fileName) {
            return `${API_URL}/masterData/getFile?fileName=${venueResourceInfo.logo}&token=abcd`
        }
        return ''
    }

    return (
        <Grid container direction={'column'} flex={1}>
            <Grid>
                <h4>Primary resource : {vendorInfo?.resourceInfo?.vendorResourceType}</h4>
            </Grid>
            <Grid container direction={'row'} justifyContent='space-between'>
                <Grid item flex={0.2} paddingX={5}>
                    <FormControl variant="outlined" fullWidth margin="dense">
                        <img src={venueResourceInfo.logo? getFileUrl(venueResourceInfo.logo):"/user-sample.jpeg"} />
                        <OutlinedInput
                            type="file"
                            value=''
                            placeholder="Logo"
                            required
                            disabled={!venueResourceInfo.uuid}
                            onChange={uploadMedia}
                            inputProps={{
                                type: 'file',
                                src: getFileUrl(venueResourceInfo.logo)
                            }}
                        />
                    </FormControl>

                </Grid>
                <Grid item flex={0.8}>
                    <FormControl fullWidth margin="dense">
                        <h4>Add Resource Information</h4>
                        <OutlinedInput
                            value={venueResourceInfo?.name}
                            placeholder="Name"
                            onChange={(e) => {
                                setvenueResourceValue('name',e.target.value)
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <OutlinedInput
                            value={venueResourceInfo?.phoneNo}
                            placeholder="Phone No"
                            required
                            onChange={(e) => {
                                setvenueResourceValue('phoneNo',e.target.value)
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <OutlinedInput
                            value={venueResourceInfo?.address}
                            placeholder="Address"
                            required
                            onChange={(e) => {
                                setvenueResourceValue('address',e.target.value)
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <OutlinedInput
                            value={venueResourceInfo?.googleMapsLink}
                            placeholder="Google Maps Link"
                            required
                            onChange={(e) => {
                                setvenueResourceValue('googleMapsLink',e.target.value)
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <OutlinedInput
                            value={venueResourceInfo?.yearOfEstablishment}
                            placeholder="Year Of Establishment"
                            required
                            inputProps={{
                                maxLength: 4,
                                type: 'number'
                            }}
                            onChange={(e) => {
                                setvenueResourceValue('yearOfEstablishment',e.target.value)
                            }}
                        />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth margin="dense">
                        <InputLabel>State</InputLabel>
                        <Select
                            fullWidth
                            style={{color: '#000'}}
                            value={venueResourceInfo.state}
                            onChange={(e) => {
                                console.log("e",e.target.value)
                                const target=e.target as HTMLInputElement
                                setvenueResourceValue('state',target.value);
                                getCities(target.value)
                            }}>
                            {
                                states.map((state) => {
                                    return (
                                        <MenuItem value={state}>
                                            {state}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth margin="dense">
                        <InputLabel>City</InputLabel>
                        <Select
                            fullWidth
                            style={{color: '#000'}}
                            value={venueResourceInfo.city}
                            onChange={(e) => {
                                const target=e.target as HTMLInputElement;
                                setvenueResourceValue('city',target.value)
                            }}>
                            {
                                cities.map((city) => {
                                    return (
                                        <MenuItem value={city}>
                                            {city}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <Grid container direction={'column'}>
                        <Grid>
                            <h4>Set amenities</h4>
                        </Grid>
                        <Grid item container direction={'row'}>

                            <Grid item className="amenitiesGridItem">
                                <FormControlLabel
                                    control={<Switch />}
                                    color='primary'
                                    label="Near To Airport"
                                    checked={venueResourceInfo.isNearToAirport}
                                    onChange={(e: React.SyntheticEvent,checked: boolean) => {
                                        handleToggleSwitch(checked,'isNearToAirport')
                                    }}
                                />
                            </Grid>

                            <Grid item className="amenitiesGridItem">
                                <FormControlLabel
                                    control={<Switch />}
                                    color='primary'
                                    label="Near To RailwayStation"
                                    checked={venueResourceInfo.isNearToRailwayStation}
                                    onChange={(e: React.SyntheticEvent,checked: boolean) => {
                                        handleToggleSwitch(checked,'isNearToRailwayStation')
                                    }}
                                />
                            </Grid>

                            <Grid item className="amenitiesGridItem">
                                <FormControlLabel
                                    control={<Switch />}
                                    color='primary'
                                    label="Has Guest Rooms"
                                    checked={venueResourceInfo.hasGuestRooms}
                                    onChange={(e: React.SyntheticEvent,checked: boolean) => {
                                        handleToggleSwitch(checked,'hasGuestRooms')
                                    }}
                                />
                            </Grid>

                            <Grid item className="amenitiesGridItem">
                                <FormControlLabel
                                    control={<Switch />}
                                    color='primary'
                                    label="has PowerBackup"
                                    checked={venueResourceInfo.hasPowerBackup}
                                    onChange={(e: React.SyntheticEvent,checked: boolean) => {
                                        handleToggleSwitch(checked,'hasPowerBackup')
                                    }}
                                />
                            </Grid>

                            <Grid item className="amenitiesGridItem">
                                <FormControlLabel
                                    control={<Switch />}
                                    color='primary'
                                    label="has Park"
                                    checked={venueResourceInfo.hasPark}
                                    onChange={(e: React.SyntheticEvent,checked: boolean) => {
                                        handleToggleSwitch(checked,'hasPark')
                                    }}
                                />
                            </Grid>

                            <Grid item className="amenitiesGridItem">
                                <FormControlLabel
                                    control={<Switch />}
                                    color='primary'
                                    label="has Matresses"
                                    checked={venueResourceInfo.hasMatresses}
                                    onChange={(e: React.SyntheticEvent,checked: boolean) => {
                                        handleToggleSwitch(checked,'hasMatresses')
                                    }}
                                />
                            </Grid>

                            <Grid item className="amenitiesGridItem">
                                <FormControlLabel
                                    control={<Switch />}
                                    color='primary'
                                    label="has Cab Pickup Service"
                                    checked={venueResourceInfo.hasCabPickupService}
                                    onChange={(e: React.SyntheticEvent,checked: boolean) => {
                                        handleToggleSwitch(checked,'hasCabPickupService')
                                    }}
                                />
                            </Grid>

                            <Grid item className="amenitiesGridItem">
                                <FormControlLabel
                                    control={<Switch />}
                                    color='primary'
                                    label="has Halogens"
                                    checked={venueResourceInfo.hasHalogens}
                                    onChange={(e: React.SyntheticEvent,checked: boolean) => {
                                        handleToggleSwitch(checked,'hasHalogens')
                                    }}
                                />
                            </Grid>

                            <Grid item className="amenitiesGridItem">
                                <FormControlLabel
                                    control={<Switch />}
                                    color='primary'
                                    label="On Road"
                                    checked={venueResourceInfo.isOnRoad}
                                    onChange={(e: React.SyntheticEvent,checked: boolean) => {
                                        handleToggleSwitch(checked,'isOnRoad')
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        {
                            venueResourceInfo.hasGuestRooms&&
                            <FormControl fullWidth margin="dense">
                                <OutlinedInput
                                    type="number"
                                    value={venueResourceInfo?.guestRoomsCount}
                                    placeholder="No of Guest Rooms"
                                    required
                                    onChange={(e) => {
                                        setvenueResourceValue('guestRoomsCount',e.target.value)
                                    }}
                                />
                            </FormControl>
                        }
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth margin="dense">
                            <FormLabel>Total Seating capacity</FormLabel>
                            <OutlinedInput
                                type="number"
                                value={venueResourceInfo?.totalSeatingCapacity}
                                placeholder="Total seating capacity"
                                required
                                onChange={(e) => {
                                    setvenueResourceValue('totalSeatingCapacity',e.target.value)
                                }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid marginTop={2}>
                <Button fullWidth variant='contained' color='success' title="Save" onClick={saveVenueResource} >Save</Button>
            </Grid>
        </Grid>
    )
}