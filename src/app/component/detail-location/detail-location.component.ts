import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDetail } from 'src/app/model/IDetail.model';
import { IDetailLocation } from 'src/app/model/IDetailLocation.model';
import { IPersonajes } from 'src/app/model/IPersonajes.model';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-detail-location',
  templateUrl: './detail-location.component.html',
  styleUrls: ['./detail-location.component.css'],
})
export class DetailLocationComponent {
  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private restService: RestService
  ) {}

  personaje?: IDetail;
  location?: IDetailLocation;

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((response) => {
      const url = response['url'];
      if (url) {
        this.restService.getDetailLocation(url).subscribe((response) => {
          this.location = response;
        });
      }
    });
  }

  getDetailResident(url: string) {
    this.route.navigate(['detail'], { queryParams: { url } });
  }
}
