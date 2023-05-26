import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

export const API_URL = "http://localhost:8080/api";

export const masterData_states_columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 300 },
  { field: "state_name", headerName: "State", width: 130 },
  { field: "city_name", headerName: "City", width: 130 },
  { field: "isActive", headerName: "Active", width: 130 },
];

export const ROOTRESOURCESTYPES = {
  VENUE: "Venue",
  CATERERS: "Caterers",
  FLORISTS: "Florists",
  MAKEUP_ARTISTS: "Make-up artists",
  WEDDING_CARD: "Wedding Card",
  MEHANDI_ARTISTS: "Mehandi Artists",
  Cakes: "Cakes",
  DJ: "DJ",
  PHOTOGRAHERS_AND_VIDEOGRAPHERS: "Photographers and videographers",
  PLASTIC_CROCKERY: "Plastic crockery",
  WATER_PROVIDER: "Water Provider",
  LIGHTNING_PROVIDER: "Lightning Provider",
  POWER_BACKUP: "Power Backup",
  CLOTHS_ON_RENT: "Cloths on Rent",
  ARTIFICIAL_JWELLERY: "Artifical jwellery",
  VINTAGE_CARS: "Vintage cars",
  Matresses: "Matresses",
  TENT_HOUSE: "Tent house",
};
