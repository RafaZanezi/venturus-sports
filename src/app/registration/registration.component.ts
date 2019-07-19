import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {
  aDias: Array<any>;
  aRideInGroup: Array<any>;

  constructor(
    private oUserService: SharedService
  ) { }

  ngOnInit() {
    this.carregarMocks();
  }

  carregarMocks() {
    this.oUserService.daysOfWeek().subscribe(res => this.aDias = res);
    this.oUserService.rideInGroup().subscribe(res => this.aRideInGroup = res);
  }

}
