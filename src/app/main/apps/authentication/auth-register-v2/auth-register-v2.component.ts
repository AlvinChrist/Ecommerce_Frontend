import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreConfigService } from '@core/services/config.service';
import { UserService } from 'app/service/user/user.service';
import { User } from 'app/viewmodel/user.viewmodel';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-auth-register-v2',
  templateUrl: './auth-register-v2.component.html',
  styleUrls: ['./auth-register-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthRegisterV2Component implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public registerForm: FormGroup;
  public submitted = false;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private toastr: ToastrService
    ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  toastrSuccess(msg: string, title: string, vertical: string = 'top', horizontal: string = 'right') {
    this.toastr.success(msg, title, {
      positionClass: `toast-${vertical}-${horizontal}`,
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const data: User = this.registerForm.getRawValue();
    this._userService.register(data).subscribe((resp) => {
      if(resp){
        this.toastrSuccess(resp,'Success!','top','center');
        this.registerForm.reset();
      }
    },(err) => {
      console.log(err);
    })
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phoneNo: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.pattern('[0-9]*')])],
      address: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      userAvatar: [''],
      role: ['User']
    },{ 
      validator: this.ConfirmedValidator('password', 'confPassword')
    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
    this.toastrSuccess('test','Success!','top','center');
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mismatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
}
