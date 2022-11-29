import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserServiceService } from '../services/user-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { global } from '../services/Global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserServiceService],
})
export class UserEditComponent implements OnInit {
  public user: User;
  public identity: any;
  public token: any;
  public status: string;
  public afuConfig:any;
  public url:any
  constructor(
    private _userService: UserServiceService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
    this.user = this.identity;
    this.url = global.url;
   }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    this._userService.update(this.user).subscribe(
      (response) => {
        if (response.user && response.user._id) {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));


        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
      }
    );
  }

}
