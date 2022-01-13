import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { AlertService } from 'app/service/alert/alert.service';
import { UserService } from 'app/service/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public coreConfig: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _alertService: AlertService,
    private _userService: UserService
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
