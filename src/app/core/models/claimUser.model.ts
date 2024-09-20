import { UserMenuModel } from "./userMenu.model";

export class ClaimUserModel {
  userId: number;
  userName: string;
  userFirstName: string;
  userLastName: string;
  userImage: File;
  userEmail: string;
  userPhoneNumberCode: string;
  userPhoneNumber: string;
  userDob: Date;
  userAddress: string;
  userCountry: string;
  userCity: string;
  genderId: number;
  gender: string;
  userRole: string;
  userRoleId: number;
  userVerification: boolean;
  userActivation: boolean;
  userPermissions: UserMenuModel[] = [];
}
