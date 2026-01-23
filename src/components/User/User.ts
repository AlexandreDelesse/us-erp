export interface UserQry {
  userId: string;
  appId: string;
  userName: string;
}
export interface UsUserDto {
  EmployeeId: number;
  SocietyId: number;
  EmployeeLabel: string;
  ApplicationId: string;
}

export interface MapUserCmd {
  EmployeeID: number;
  SocietyId: string;
  KeyCloackId: string;
}

export interface MapUserDto extends MapUserCmd {
  MapId: number;
}
