import { GridColDef } from "@mui/x-data-grid";

export const API_URL = "http://localhost:8080/api";

export const masterData_states_columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 300 },
  { field: "state_name", headerName: "State", width: 130 },
  { field: "city_name", headerName: "City", width: 130 },
  { field: "isActive", headerName: "Active", width: 130 },
];

export const masterData_vendor_columns: GridColDef[] = [
  { field: "_id", headerName: "id", width: 100 },
  { field: "uuid", headerName: "uuid", width: 100 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "firstName", headerName: "First Name", width: 100 },
  { field: "lastName", headerName: "Last Name", width: 100 },
  { field: "avatar", headerName: "avatar", width: 20 },
  { field: "country", headerName: "country", width: 100 },
  { field: "city", headerName: "City", width: 100 },
  { field: "state", headerName: "state", width: 150 },
  { field: "resourceTypeId", headerName: "resourceTypeId", width: 100 },
  { field: "createdOn", headerName: "created On", width: 100 },
  { field: "resourceInfo", headerName: "resourceInfo", width: 100 },
];
