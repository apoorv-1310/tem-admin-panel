import React from "react"
import {Box,Button,FormControl,Grid,Input,InputLabel,Link,MenuItem,OutlinedInput,Select,Tab} from "@mui/material"
import {API_URL} from "../shared";
import axios from "axios";
import {IGlobalProp,IState,IVendor,IVendorResourceType} from "../interfaces";
import {TabContext,TabList,TabPanel} from "@mui/lab";
import underscore from 'underscore';
import {APITalkService} from "../services";
import {setErrorSnackBarMessage,setSnackBarMessage} from "../redux";
import {DataGrid,GridColDef,GridRenderCellParams} from "@mui/x-data-grid";

export const Vendor=(props: IGlobalProp) => {
    const [value,setValue]=React.useState('1');
    const [vendors,setVendors]=React.useState<Array<IVendor>>([])
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
        phoneNo: "",
    });

    React.useEffect(() => {
        getMasterData()
    },[]);

    React.useEffect(() => {
        if(vendorForm.state) {
            new APITalkService().get(`${API_URL}/masterData/cities/${vendorForm.state}`).then((response) => {
                const onlyCities=response.data.data.map((d: IState) => d.city_name);
                const uniqData=underscore.uniq(onlyCities);
                setCities(uniqData);
            })
        }
    },[vendorForm])

    const getMasterData=async () => {
        const rootCategories=axios.get(API_URL+"/masterData/getRootCategories?format=json");
        const getVendors=axios.get(`${API_URL}/vendors/getVendors`);
        const getStates=axios.get(`${API_URL}/masterData/getStates`)
        axios.all([rootCategories,getVendors,getStates]).then((response) => {
            console.log("props",props)
            setVendorResourcesType(response[0].data.data);
            setVendors(response[1].data.data);
            const onlyStates=response[2].data.map((d: IState) => d.state_name);
            const uniqData=underscore.uniq(onlyStates);
            setStatesData(uniqData)
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

    const saveVendor=() => {
        console.log("vendorForm",vendorForm);
        new APITalkService().post(`${API_URL}/vendors/register`,vendorForm,true).then((response) => {
            setSnackBarMessage("Vendor Created");
            getMasterData()
        }).catch((e) => {
            setErrorSnackBarMessage(e.response.data.message);
        })
    }

    const masterData_vendor_columns: GridColDef[]=[
        {
            field: "_id",
            headerName: "Id",
            width: 100
        },
        {
            field: "uuid",headerName: "UUID",width: 100,
            renderCell: (cellValue: GridRenderCellParams) => {
                return <Link target="_self" href={`/vendor-detail/${cellValue.row.uuid}`}>{cellValue.row._id}</Link>;
            },
        },
        {
            field: "email",
            headerName: "Email",
            width: 220
        },
        {
            field: "firstName",
            headerName: "First Name",
            width: 100
        },
        {
            field: "lastName",
            headerName: "Last Name",
            width: 100
        },
        {
            field: "avatar",
            headerName: "Avatar",
            width: 20
        },
        {
            field: "country",
            headerName: "Country",
            width: 100
        },
        {
            field: "city",
            headerName: "City",
            width: 100
        },
        {
            field: "state",
            headerName: "State",
            width: 150
        },
        {
            field: "resourceTypeId",
            headerName: "Resource Type",
            width: 200,
            renderCell: (cellValue: GridRenderCellParams) => {
                return `${cellValue.row.resourceInfo.vendorResourceType} `;
            }
        }
    ];


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
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={vendors}
                        columns={masterData_vendor_columns}
                        paginationMode="server"
                        filterMode='client'
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0,pageSize: 5},
                            },
                        }}
                        pageSizeOptions={[5,10,15]}
                    />
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

                        <FormControl variant="filled" fullWidth margin="normal">
                            <InputLabel>State</InputLabel>

                            <Select
                                fullWidth
                                style={{margin: '10px auto',color: '#000'}}
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
                            <InputLabel>City</InputLabel>
                            <Select
                                variant="filled"
                                fullWidth
                                style={{margin: '10px auto',color: '#000'}}
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

                        <FormControl variant="filled" fullWidth margin="none">
                            <InputLabel>Resource type</InputLabel>
                            <Select
                                fullWidth
                                style={{margin: '10px auto',color: '#000'}}
                                placeholder="Resource type"
                                label="Resource type"
                                defaultValue={vendorResourcesType&&vendorResourcesType[0]&&vendorResourcesType[0].uuid}
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