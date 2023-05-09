import {GridColDef} from "@mui/x-data-grid";

export const API_URL = 'http://localhost:8080/api';

export const masterData_states_columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 300 },
    { field: 'state_name', headerName: 'State', width: 130 },
    { field: 'city_name', headerName: 'City', width: 130 },
    { field: 'isActive', headerName: 'Active', width: 130 },
  ];