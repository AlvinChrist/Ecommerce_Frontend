import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { User } from '../../model/user.viewmodel';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit, OnDestroy {
  // Public
  @Input() modal: any
  public avatarImage: string;
  public user: User;
  private UserForm: FormGroup;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
     private _userService: UserService,
     private _fb: FormBuilder
     ) {
     this._unsubscribeAll = new Subject();
     this.user = this._userService.currentUserValue;
     this.UserForm = this._fb.group({
       name: [this.user.name, [Validators.required]],
       userName: [this.user.userName, [Validators.required]],
       address: [this.user.address, [Validators.required]],
       email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
       phoneNo: [this.user.phoneNo, Validators.compose([Validators.required, Validators.maxLength(15), Validators.pattern('[0-9]*')])],
       password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
       confPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
       userAvatar: []
     })
     console.log(this.user)
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Upload Image
   *
   * @param event
   */
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    if (form.valid) {
      console.log('Submitted...!');
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
