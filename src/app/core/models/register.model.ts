export class RegisterModel {
  userFirstName: string;
  userLastName: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userPhoneNumber: string;
  userStreetAddress: string;
  userState: string;
  userCity: string;
  userPostalCode: string;
  userRoleId: number;
  constructor(
    userFirstName: string,
    userLastName: string,
    userName: string,
    userEmail: string,
    userPhoneNumber: string,
    userStreetAddress: string,
    userState: string,
    userCity: string,
    userRoleId: number,
    userPassword: string,
    userPostalCode: string
  ) {
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPhoneNumber = userPhoneNumber;
    this.userStreetAddress = userStreetAddress;
    this.userState = userState;
    this.userCity = userCity;
    this.userRoleId = userRoleId;
    this.userPassword = userPassword;
    this.userPostalCode = userPostalCode;
  }
}
