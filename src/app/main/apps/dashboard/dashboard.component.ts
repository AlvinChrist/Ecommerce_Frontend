import { Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public coreConfig: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _coreConfigService: CoreConfigService
  ) { 
    this._unsubscribeAll = new Subject();
    this._coreConfigService.config = {
      layout: {
        type: 'vertical'
      }
    };
  }

  ngOnInit(): void {
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

}
