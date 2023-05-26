import {FormControl,Grid,InputLabel,MenuItem,OutlinedInput,Select} from "@mui/material"
import React from "react";
import {IFloristResourceInfo,IState,IVendor} from "../../interfaces";

interface IFloristFormProp {
    uuid: string;
    states: Array<string>;
    cities: Array<string>;
    vendorInfo: IVendor|undefined;
    getCities: (stateName: string) => void;
}

export const FloristForm=(props: IFloristFormProp) => {
    const {
        uuid,
        states,
        cities,
        vendorInfo,
        getCities
    }=props
    const [floristResourceInfo,setFloristResourceInfo]=React.useState<IFloristResourceInfo>({
        uuid: "",
        vendorId: "",
        name: "",
        email: "",
        phoneNo: "",
        address: "",
        googleMapsLink: "",
        yearOfEstablishment: "",
        city: "",
        state: "",
        country: "india",
        logo: "",
        createdOn: "",
    });


    const setFloristFormValue=(field: string,value: string): void => {
        setFloristResourceInfo({
            ...floristResourceInfo,
            [field]: value
        })
    }
    return (
        <Grid container direction={'column'} flex={1}>
            <Grid>
                <h4>Primary resource : {vendorInfo?.resourceInfo?.vendorResourceType}</h4>
            </Grid>
            <Grid container direction={'row'} justifyContent='space-between'>
                <Grid item flex={0.2} paddingX={5}>
                    <FormControl variant="outlined" fullWidth margin="dense">
                        <img src="/user-sample.jpeg" />
                        <OutlinedInput
                            type="file"
                            value={floristResourceInfo?.logo}
                            placeholder="Logo"
                            required
                            inputProps={{
                                type: 'file'
                            }}
                        />
                    </FormControl>

                </Grid>
                <Grid item flex={0.8}>
                    <FormControl fullWidth margin="dense">
                        <h4>Add Resource Information</h4>
                        <OutlinedInput
                            value={floristResourceInfo?.name}
                            placeholder="Name"
                            onChange={(e) => {
                                setFloristFormValue('name',e.target.value)
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <OutlinedInput
                            value={floristResourceInfo?.phoneNo}
                            placeholder="Phone No"
                            required
                            onChange={(e) => {
                                setFloristFormValue('phoneNo',e.target.value)
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <OutlinedInput
                            value={floristResourceInfo?.email}
                            placeholder="Email"
                            required
                            onChange={(e) => {
                                setFloristFormValue('email',e.target.value)
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <OutlinedInput
                            value={floristResourceInfo?.address}
                            placeholder="Address"
                            required
                            onChange={(e) => {
                                setFloristFormValue('address',e.target.value)
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <OutlinedInput
                            value={floristResourceInfo?.googleMapsLink}
                            placeholder="Google Maps Link"
                            required
                            onChange={(e) => {
                                setFloristFormValue('googleMapsLink',e.target.value)
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <OutlinedInput
                            value={floristResourceInfo?.yearOfEstablishment}
                            placeholder="Year Of Establishment"
                            required
                            inputProps={{
                                maxLength: 4,
                                type: 'number'
                            }}
                            onChange={(e) => {
                                setFloristFormValue('yearOfEstablishment',e.target.value)
                            }}
                        />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth margin="dense">
                        <InputLabel>State</InputLabel>
                        <Select
                            fullWidth
                            style={{color: '#000'}}
                            value={floristResourceInfo.state}
                            onChange={(e) => {
                                console.log("e",e.target.value)
                                const target=e.target as HTMLInputElement
                                setFloristFormValue('state',target.value);
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
                            value={floristResourceInfo.city}
                            onChange={(e) => {
                                const target=e.target as HTMLInputElement;
                                setFloristFormValue('city',target.value)
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
                </Grid>
            </Grid>
        </Grid>
    )
}