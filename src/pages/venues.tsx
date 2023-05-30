import {Box,Button,Card,CardActions,CardContent,CardMedia,Checkbox,FormControlLabel,Typography} from "@mui/material"
import {IGlobalProp,IVenueResourceInfo} from "../interfaces"
import React from "react"
import {APITalkService} from "../services"
import {API_ADMIN_URL,API_URL} from "../shared"

export const Venues=(props: IGlobalProp) => {


    const [venues,setVenues]=React.useState<Array<IVenueResourceInfo>>([])


    React.useEffect(() => {
        getAllVenues()
    },[])

    const getAllVenues=() => {
        new APITalkService().get(`${API_ADMIN_URL}/venues/getAllVenues`,true).then((response) => {
            setVenues(response.data.data)
        })
    }

    return (
        <Box paddingX={10}>
            <h4>Venues</h4>
            {
                venues.map((venue) => {
                    return (
                        <Card sx={{maxWidth: 345}}>
                            <CardMedia
                                sx={{height: 140}}
                                image={venue.logo}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {venue.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {venue.state} | {venue.city} | {venue.yearOfEstablishment}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Seating capacity: {venue.totalSeatingCapacity}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" fontWeight={'bold'}>
                                    {venue.hasGuestRooms&&<FormControlLabel control={<Checkbox defaultChecked />} label="Guest Rooms" />}
                                    {venue.hasCabPickupService&&<FormControlLabel control={<Checkbox defaultChecked />} label="CabPickupService" />}
                                    {venue.hasPark&&<FormControlLabel control={<Checkbox defaultChecked />} label="Park" />}
                                    {venue.isOnRoad&&<FormControlLabel control={<Checkbox defaultChecked />} label="OnRoad" />}
                                    {venue.isNearToAirport&&<FormControlLabel control={<Checkbox defaultChecked />} label="Near To Airport" />}
                                    {venue.isNearToRailwayStation&&<FormControlLabel control={<Checkbox defaultChecked />} label="Near To Railway station" />}
                                    {venue.hasMatresses&&<FormControlLabel control={<Checkbox defaultChecked />} label="Materesses" />}
                                    {venue.hasHalogens&&<FormControlLabel control={<Checkbox defaultChecked />} label="Halogens" />}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant='contained' color='error'>De-list</Button>
                                <Button size="small" variant='contained'>Associate to vendor</Button>
                            </CardActions>
                        </Card>
                    )
                })
            }
        </Box>
    )
}