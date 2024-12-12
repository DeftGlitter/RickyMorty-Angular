import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ILocation, Result } from 'src/app/model/ILocation.model';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  locations: Result[] = [];

  constructor(private restService: RestService, private route: Router) {}

  ngOnInit(): void {
    this.getAllLocation();
  }

  getAllLocation() {
    this.restService.getLocal().subscribe((response: ILocation) => {
      this.locations = response.results;
    });
  }
  getLocationDetail(url: string) {
    this.route.navigate(['detailLocation'], { queryParams: { url } });
  }
}
