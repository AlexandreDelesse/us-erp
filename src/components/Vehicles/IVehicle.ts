export type Vehicle = {
  id: number;
  immat: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  status: "available" | "in_service" | "unavailable";
  purchasePrice: number;
  purchaseDate: string;
  department: "ambulance" | "funeraire" | "sang" | "marbrerie";
};
