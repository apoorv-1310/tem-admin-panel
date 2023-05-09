import React from "react"
import {Box,Button,FormControl,Grid,Input,InputLabel,MenuItem,OutlinedInput,Select,Tab} from "@mui/material"
import {API_URL} from "../shared";
import axios from "axios";
import {IState,IVendor,IVendorResourceType} from "../interfaces";
import {TabContext,TabList,TabPanel} from "@mui/lab";
import underscore from 'underscore';
import {APITalkService} from "../services";
import {setErrorSnackBarMessage, setSnackBarMessage} from "../redux";

export const Vendor=() => {
    const [value,setValue]=React.useState('1');
    const [statesData,setStatesData]=React.useState<string[]>([])
    const [cities,setCities]=React.useState<string[]>([])

    const [vendorResourcesType,setVendorResourcesType]=React.useState<IVendorResourceType[]>([]);
    const [vendorForm,setVendorForm]=React.useState<IVendor>({
        email: "",
        firstName: "",
        lastName: "",
        password: "12345678",
        avatar: "",
        country: "india",
        city: "",
        state: "",
        resourceTypeId: "",
        phoneNo: ""
    });


    React.useEffect(() => {
        getMasterData()
    },[]);

    React.useEffect(() => {
        console.log("vendorForm",vendorForm)
        if(vendorForm.state) {
            new APITalkService().get(`${API_URL}/masterData/cities/${vendorForm.state}`).then((response) => {
                const onlyCities=response.data.data.map((d: IState) => d.city_name);
                const uniqData=underscore.uniq(onlyCities);
                setCities(uniqData);
            })
        }
    },[vendorForm])

    const getMasterData=async () => {
        const states=axios.get(API_URL+"/masterData/getStates")
        const rootCategories=axios.get(API_URL+"/masterData/getRootCategories?format=json");
        axios.all([states,rootCategories]).then((response) => {
            console.log("response",response);
            const onlyStates=response[0].data.map((d: IState) => d.state_name);
            const uniqData=underscore.uniq(onlyStates)
            setStatesData(uniqData);
            setVendorResourcesType(response[1].data.data)
        })
    }

    const handleChange=(event: React.SyntheticEvent,newValue: string) => {
        setValue(newValue);
    };


    const setFormValue=(field: string,value: string): void => {
        setVendorForm({
            ...vendorForm,
            [field]: value
      })
    }

    const saveVendor = () =>{
        console.log("vendorForm",vendorForm);
        new APITalkService().post(`${API_URL}/vendors/register`,vendorForm,true).then((response)=>{
            setSnackBarMessage("Vendor Created")
        }).catch((e)=>{
            console.log("e",e.response.data.message)
            setErrorSnackBarMessage(e.response.data.message);
        })
    }

    return (
        <Box paddingX={10}>
            <h4>Master Tables</h4>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1,borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Vendors" value="1" />
                        <Tab label="Add Vendors" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">

                </TabPanel>
                <TabPanel value="2">
                    <form>
                        <FormControl fullWidth margin="normal">
                            <OutlinedInput fullWidth placeholder="First Name" onChange={(e) => {
                                setFormValue('firstName',e.target.value)
                            }} />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <OutlinedInput fullWidth placeholder="Last Name" onChange={(e) => {
                                setFormValue('lastName',e.target.value)
                            }} />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <OutlinedInput placeholder="Email" onChange={(e) => {
                                setFormValue('email',e.target.value)
                            }} />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <OutlinedInput 
                            value={vendorForm.password}
                            placeholder="password"
                                onChange={(e) => {
                                    setFormValue('password',e.target.value)
                                }}
                            />
                        </FormControl>


                        <FormControl fullWidth margin="normal">
                            <OutlinedInput placeholder="PhoneNo"
                                onChange={(e) => {
                                    setFormValue('phoneNo',e.target.value)
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <Select
                                fullWidth
                                style={{margin: '10px auto',color: '#000'}}
                                placeholder="State"
                                label="State"
                                value={vendorForm.state}
                                onChange={(e) => {
                                    console.log("e",e.target.value)
                                    const target=e.target as HTMLInputElement
                                    setFormValue('state',target.value)
                                }}>
                                {
                                    statesData.map((state) => {
                                        return (
                                            <MenuItem value={state}>
                                                {state}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <Select
                                fullWidth
                                style={{margin: '10px auto',color: '#000'}}
                                placeholder="City"
                                label="City"
                                value={vendorForm.city}
                                onChange={(e) => {
                                    const target=e.target as HTMLInputElement;
                                    setFormValue('city',target.value)
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

                        <FormControl fullWidth margin="normal">
                            <OutlinedInput fullWidth placeholder="country" value={vendorForm.country} disabled />
                        </FormControl>

                        <FormControl fullWidth margin="none">
                            <Select fullWidth style={{margin: '10px auto',color: '#000'}}
                                placeholder="Resource type"
                                label="Resource type"
                                value={vendorForm.resourceTypeId}
                                onChange={(e) => {
                                    const target=e.target as HTMLInputElement
                                    setFormValue('resourceTypeId',target.value)
                                }}>
                                {
                                    vendorResourcesType.map((vendorResourcesType) => {
                                        return (
                                            <MenuItem value={vendorResourcesType.uuid}>
                                                {vendorResourcesType.vendorResourceType}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <Button variant="contained" fullWidth onClick={saveVendor}>Save</Button>
                    </form>
                </TabPanel>
            </TabContext>
        </Box>
    )
}