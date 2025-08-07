export interface KcUserDto {
  email: string;
  enabled: boolean;
  id: string;
  username: string;
}

export interface EnableUserCmd {
  userId: string;
  enabled: boolean;
}
