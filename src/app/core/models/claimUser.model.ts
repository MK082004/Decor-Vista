import { UserMenuModel } from "./userMenu.model";

export class ClaimUserModel {
  userId: number;
  userFirstName: string;
  userLastName: string;
  userName: string;
  userEmail: string;
  userPhoneNumber: string;
  userAddress: string;
  userState: string;
  userCity: string;
  userRoleName: string;
  token?: string;
  userPermissions?: UserMenuModel[];
}
