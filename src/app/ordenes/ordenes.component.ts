import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css'],
  providers:[UserServiceService]
})
export class OrdenesComponent implements OnInit {

  public identity: any;
  constructor(
    private _userService: UserServiceService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getidentity();
   }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.identity = this._userService.getidentity();
  }
}
