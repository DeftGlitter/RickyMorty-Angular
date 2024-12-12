import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDetail } from 'src/app/model/IDetail.model';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    private activateRoute: ActivatedRoute,
    private restService: RestService
  ) {}

  personaje?: IDetail;

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((response) => {
      const url = response['url'];
      if (url) {
        this.restService.getDetail(url).subscribe((response) => {
          this.personaje = response;
        });
      }
    });
  }
}
