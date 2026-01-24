export interface KcUserDto {
  email: string;
  enabled: boolean;
  emailVerified: boolean;
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface EnableUserCmd {
  userId: string;
  enabled: boolean;
}
