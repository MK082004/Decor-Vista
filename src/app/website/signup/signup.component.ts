import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/core/models/register.model';
import { AuthService } from 'src/app/core/services/auth/auth/auth.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  userRoles: string[] = ['user', 'designer'];
  states: string[] = ['State 1', 'State 2', 'State 3'];
  citiesData: { [key: string]: string[] } = {
    'State 1': ['City 1', 'City 2'],
    'State 2': ['City 3', 'City 4'],
    'State 3': ['City 5', 'City 6']
  };
  filteredCities: string[] = [];
  selectedState: string | null = null;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private notificationService: DialogService) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{15}$')]],
      userRole: ['', [Validators.required]],
      userStreet: ['', [Validators.required]],
      userState: ['', [Validators.required]],
      userCity: ['', [Validators.required]],
      userPostalCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      userPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      userConfirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {}

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('userPassword')?.value;
    const confirmPassword = formGroup.get('userConfirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onStateChange(state: string) {
    this.selectedState = state;
    this.filteredCities = this.citiesData[state] || [];
    this.signUpForm.patchValue({ userCity: '', userStreet: '' });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formValues = this.signUpForm.getRawValue();
      const registerData: RegisterModel = {
        name: formValues.name,
        userName: formValues.username,
        userEmail: formValues.userEmail,
        userPhoneNumber: formValues.userPhoneNumber,
        userStreetAddress: formValues.userStreet,
        userState: formValues.userState,
        userCity: formValues.userCity,
        userRole: formValues.userRole,
        userPassword: formValues.userPassword,
        userPostalCode: String(formValues.userPostalCode)
      };
      this.authService.registerUser(registerData).subscribe(res => {
        if (res) {
          this.notificationService.showNotification(res.message, res.isSuccessfull);
        }
        }
      );
    }
  }

  googleSignUp() {
    // this.authService.googleAuth().subscribe(response => {
    //   console.log('Google authentication successful', response);
    // });
  }

  facebookSignUp() {
    // this.authService.facebookAuth().subscribe(response => {
    //   console.log('Facebook authentication successful', response);
    // });
  }
}
