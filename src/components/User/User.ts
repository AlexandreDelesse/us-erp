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

export interface User {
  keycloakId?: string;
  userId?: number;
  email: string;
  firstname?: string;
  lastname?: string;
  displayName?: string;
  emailVerified?: boolean;
  enabled?: boolean;
  userRef: string; //Pour identification unique peut importe si le User vient de KC ou US.
}
