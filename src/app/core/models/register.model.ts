export class RegisterModel {
  name: string;
  userName: string;
  userEmail: string;
  userPhoneNumber: string;
  userStreetAddress: string;
  userState: string;
  userCity: string;
  userRole: string;
  userPassword: string;
  userPostalCode: string;

  constructor(
    name: string,
    userName: string,
    userEmail: string,
    userPhoneNumber: string,
    userStreetAddress: string,
    userState: string,
    userCity: string,
    userRole: string,
    userPassword: string,
    userPostalCode: string
  ) {
    this.name = name;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPhoneNumber = userPhoneNumber;
    this.userStreetAddress = userStreetAddress;
    this.userState = userState;
    this.userCity = userCity;
    this.userRole = userRole;
    this.userPassword = userPassword;
    this.userPostalCode = userPostalCode;
  }
}
