import { CommonHelper } from './../../core/helpers/common.helper';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/core/models/register.model';
import { UserRoleModel } from 'src/app/core/models/userRole.model';
import { AuthService } from 'src/app/core/services/auth/auth/auth.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild('ngSignUpForm') ngSignUpForm: NgForm;
  signUpForm: FormGroup;
  userRoles: UserRoleModel[] = [];
  states: string[] = [
    'Punjab',
    'Sindh',
    'Khyber Pakhtunkhwa',
    'Balochistan',
    'Gilgit-Baltistan',
    'Islamabad Capital Territory',
    'Azad Jammu and Kashmir',
  ];

  cities: { [key: string]: string[] } = {
    Punjab: [
      'Lahore',
      'Faisalabad',
      'Rawalpindi',
      'Multan',
      'Gujranwala',
      'Sialkot',
      'Bahawalpur',
      'Sargodha',
      'Sheikhupura',
      'Jhang',
      'Kasur',
      'Okara',
      'Rahim Yar Khan',
    ],
    Sindh: [
      'Karachi',
      'Hyderabad',
      'Sukkur',
      'Larkana',
      'Mirpurkhas',
      'Nawabshah',
      'Thatta',
      'Badin',
      'Jacobabad',
      'Dadu',
    ],
    'Khyber Pakhtunkhwa': [
      'Peshawar',
      'Mardan',
      'Abbottabad',
      'Swat',
      'Dera Ismail Khan',
      'Bannu',
      'Charsadda',
      'Kohat',
      'Nowshera',
      'Batagram',
    ],
    Balochistan: [
      'Quetta',
      'Turbat',
      'Sibi',
      'Makran',
      'Khuzdar',
      'Panjgur',
      'Ziarat',
      'Lasbela',
      'Loralai',
      'Dera Murad Jamali',
    ],
    'Gilgit-Baltistan': [
      'Gilgit',
      'Skardu',
      'Hunza',
      'Gupis',
      'Diamer',
      'Ghizer',
      'Astore',
      'Shigar',
      'Baltistan',
      'Bagrot',
    ],
    'Islamabad Capital Territory': ['Islamabad', 'Rawalpindi'],
    'Azad Jammu and Kashmir': [
      'Muzaffarabad',
      'Mirpur',
      'Rawalakot',
      'Bhimber',
      'Kotli',
      'Poonch',
      'Neelum',
      'Haveli',
      'Bagh',
      'Sudhnoti',
    ],
  };
  filteredCities: string[] = [];
  selectedState: string | null = null;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notificationService: DialogService,
    private commonService: CommonService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.createSignUpForm();
    this.signUpForm.get('userConfirmPassword')?.valueChanges.subscribe(() => {
      this.passwordMatchValidator(this.signUpForm);
    });
    this.fetchUserRoles();
  }

  createSignUpForm(): FormGroup {
    return this.fb.group({
      userFirstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]+$'),
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      userLastName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]+$'),
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      userEmail: ['', [Validators.required, Validators.email]],
      userPhoneNumber: [
        '+92',
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.minLength(13),
        ],
      ],
      userRole: ['', [Validators.required]],
      userState: ['', [Validators.required]],
      userCity: [{ value: '', disabled: true }, Validators.required],
      userStreet: [{ value: '', disabled: true }, Validators.required],
      userPostalCode: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      userPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#\$%\^&\*\(\)\!\?])[A-Za-z\d@#\$%\^&\*\(\)\!\?]+$/
          ),
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      userConfirmPassword: ['', [Validators.required]],
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('userPassword')?.value;
    const confirmPassword = formGroup.get('userConfirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup
        .get('userConfirmPassword')
        ?.setErrors({ required: true, passwordMismatch: true });
    } else {
      formGroup.get('userConfirmPassword')?.setErrors(null);
    }
  }

  onStateChange(selectedState: string) {
    if (selectedState) {
      this.signUpForm.get('userCity').enable();
      this.signUpForm.get('userStreet').enable();
      this.signUpForm.get('userCity').reset();
      this.signUpForm.get('userStreet').reset();
    } else {
      this.signUpForm.get('userCity').disable();
      this.signUpForm.get('userStreet').disable();
    }
  }

  getCitiesForSelectedState(): string[] {
    const selectedState = this.signUpForm.get('userState').value;
    return this.cities[selectedState] || [];
  }

  fetchUserRoles() {
    this.commonService.fetchRoles();
    this.commonService.roles$.subscribe((res) => {
      if (res) {
        var removeAdminColumn = res.splice(1, 2);
        this.userRoles = removeAdminColumn;
      }
    });
  }

  resetForm() {
    this.signUpForm.reset();
    this.ngSignUpForm.resetForm();
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formValues = this.signUpForm.getRawValue();
      const model: RegisterModel = {
        userFirstName: formValues.userFirstName,
        userLastName: formValues.userLastName,
        userName: formValues.username,
        userEmail: formValues.userEmail,
        userPhoneNumber: formValues.userPhoneNumber.toString(),
        userStreetAddress: formValues.userStreet,
        userState: formValues.userState,
        userCity: formValues.userCity,
        userRoleId: formValues.userRole,
        userPassword: formValues.userPassword,
        userPostalCode: formValues.userPostalCode,
      };
      this.isLoading = true;
      this.authService.registerUser(model).subscribe((res) => {
        this.isLoading = false;
        if (res.isSuccessful) {
          this.resetForm();
          this.notificationService.showMessage(res.message, res.isSuccessful);
        } else {
          this.notificationService.showMessage(res.message, res.isSuccessful);
        }
      });
    } else {
      Object.keys(this.signUpForm.controls).forEach((key) => {
        const control = this.signUpForm.get(key);
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
