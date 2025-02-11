import React from "react";
import {Box,Button,ButtonGroup,Divider,Grid,ListItem,ListItemText} from "@mui/material";
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import {TabContext,TabPanel} from "@mui/lab";
import {API_URL,masterData_states_columns} from "../shared";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";
import {IGlobalProp,IState,IVendorResourceType} from "../interfaces";
import OutlinedInput from '@mui/material/OutlinedInput';
import {APITalkService} from "../services";
import {setErrorSnackBarMessage,setSnackBarMessage} from "../redux";
import {useNavigate} from "react-router-dom";

export const Dashboard=(props: IGlobalProp): React.ReactElement => {
    const [value,setValue]=React.useState('1');
    const [vendorResourcesType,setVendorResourcesType]=React.useState<IVendorResourceType[]>([])
    const [statesData,setStatesData]=React.useState<IState[]>([])
    const [newVendorResource,setNewVendorResource]=React.useState<string>('');
    const navigation = useNavigate()
    React.useEffect(() => {getMasterData()},[]);

    const getMasterData=async () => {
        const states=axios.get(API_URL+"/masterData/getStates",{headers: {token: 'abcd'}})
        const rootCategories=axios.get(API_URL+"/masterData/getRootCategories?format=json",{headers: {token: 'abcd'}});
        axios.all([states,rootCategories]).then((response) => {
            console.log("response",response);
            setStatesData(response[0].data);
            setVendorResourcesType(response[1].data.data)
        })
    }

    const handleChange=(event: React.SyntheticEvent,newValue: string) => {
        setValue(newValue);
    };

    const updateResourceType=(resource: IVendorResourceType) => {
        const newValue: string|null=window.prompt("Update resource ",resource.vendorResourceType);
        new APITalkService().put(`${API_URL}/masterData/updateVendorResourceType/${resource.uuid}?vendorResourceType=${newValue}`,{},false)
            .then((response) => {
                setSnackBarMessage("Updated");
                getMasterData()
            }).catch((e) => {
                setErrorSnackBarMessage('Some Error Occured')
            })
    }

    const addNewVendorResourceType=() => {
        new APITalkService().post(`${API_URL}/masterData/addVendorResource?newResource=${newVendorResource}`,{},true)
            .then((response) => {
                getMasterData();
                setSnackBarMessage("New resource has been created")
            }).catch((error) => {
                setErrorSnackBarMessage("Some error occured, please try again later")
            })
    }

    const deleteResource=(resource: IVendorResourceType) => {
        new APITalkService().delete(`${API_URL}/masterData/deleteVendorResourceType/${resource.uuid}`,true)
            .then((response) => {
                setSnackBarMessage(response.data.message);
                getMasterData();
            }).catch((error) => {
                setSnackBarMessage('Some Error occured')
            })
    }

    return (
        <Box paddingX={10}>

            <ButtonGroup variant="outlined" style={{marginTop: '20px',overflow: 'scroll', width:'100%',flexWrap:'wrap'}} >
                {
                    vendorResourcesType.map((vendorResource) => {
                        return <Button variant="contained" style={{width:'200px',margin:5}} onClick={()=>{
                            navigation(vendorResource.vendorResourceType.toLowerCase())
                        }} >{vendorResource.vendorResourceType}</Button>
                    })
                }
            </ButtonGroup>


            <h4>Master Tables</h4>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1,borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Root Resources" value="1" />
                        <Tab label="States & cities" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Grid container flex={1}>
                        <Grid item justifyContent={'flex-end'} flex={0.9}>
                            <OutlinedInput value={newVendorResource} onChange={(e) => {
                                setNewVendorResource(e.target.value)
                            }} placeholder="Add New Vendor Resources type" fullWidth style={{height: '40px'}} />
                        </Grid>
                        <Grid flex={0.1}>
                            <Button variant="contained" title="Add New Category" onClick={addNewVendorResourceType}>Save</Button>
                        </Grid>
                    </Grid>
                    <Divider style={{margin: '5px 0px',color: '#000'}} />
                    <Grid container>
                        {
                            vendorResourcesType.map((vendorResource) => {
                                return (
                                    <ListItem>
                                        <ListItemText title={vendorResource.vendorResourceType}>
                                            <Grid container item style={{justifyContent: 'space-between',display: 'flex'}}>
                                                <Grid item>
                                                    {vendorResource.vendorResourceType}
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="text" color="primary" onClick={() => {updateResourceType(vendorResource)}}>Edit</Button>
                                                    <Button variant="text" color="error" onClick={() => {deleteResource(vendorResource)}}>Remove</Button>
                                                </Grid>
                                            </Grid>
                                        </ListItemText>
                                    </ListItem>
                                )
                            })
                        }
                    </Grid>
                </TabPanel>

                <TabPanel value="2">
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={statesData}
                        columns={masterData_states_columns}
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
            </TabContext>
        </Box>
    )
}