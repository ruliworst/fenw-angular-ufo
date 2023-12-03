import { Component } from '@angular/core';
import { ApiClientService } from 'src/app/services/apiclient-service';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent {
  globalRecords : any;
  personalRecords : any[] = [];

  constructor(public authService: AuthService, private apiClientService : ApiClientService) { }

  ngOnInit() {
    this.authService.authenticationChanged.subscribe();
    this.getGlobalRecords();
    this.getPersonalRecords();
  }

  getGlobalRecords() {
    this.apiClientService.getGlobalRecords()
      .subscribe(records => {
        this.globalRecords = records as [];

        this.globalRecords.forEach((record: { [x: string]: string; }) => {
          const date = new Date(record["recordDate"]);
          record["recordDate"] = date.toLocaleDateString();
        });
      });
  }

  getPersonalRecords() {
    this.apiClientService.getPersonalRecords()
      .subscribe(records => {
        this.personalRecords = records as [];

        this.personalRecords.forEach((record: { [x: string]: string; }) => {
          const date = new Date(record["recordDate"]);
          record["recordDate"] = date.toLocaleDateString();
        });
      });
  }
}
