import {BasicUserProfile} from "./BasicUserProfile";

export interface BlogMessageDto {
  storeId: string;
  storeName: string;
  message: string;
  created: Date;

  sender?: BasicUserProfile;
}
