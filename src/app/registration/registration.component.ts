import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {
  aDias: Array<any>;
  aRideInGroup: Array<any>;
  aDiasEscolhidos: Array<any>;
  sRideOption: string;

  oForm: FormGroup;

  constructor(
    private oUserService: SharedService,
    oFormBuilder: FormBuilder
  ) {
    this.oForm = oFormBuilder.group({
      edtUserName: [null, Validators.required],
      edtName: [null, Validators.required],
      edtEmail: [null, Validators.required],
      edtCity: [null, []]
    });

    this.aDiasEscolhidos = new Array<any>();
  }

  addNewUser() {
    const oUser = {
      id: this.oUserService.nUsersLength + 1,
      username: this.edtUserName.value,
      name: this.edtName.value,
      email: this.edtEmail.value,
      address : {
        city: this.edtCity.value
      },
      rideOption: this.sRideOption,
      dayOfWeek : this.aDiasEscolhidos
    }

    this.oUserService.aNewUsers.push(oUser);
  }

  ngOnInit() {
    this.carregarMocks();
  }

  carregarMocks() {
    this.oUserService.daysOfWeek().subscribe(res => this.aDias = res);
    this.oUserService.rideInGroup().subscribe(res => this.aRideInGroup = res);
  }

  saveDays(nIndex: number) {
    const oDia = this.aDias[nIndex];

    if(!this.aDiasEscolhidos.some(item => item.name === oDia.name)) {
      this.aDiasEscolhidos.push(oDia);
    } else {
      const nSplice = this.aDiasEscolhidos.findIndex(item => item.name == oDia.name);
      this.aDiasEscolhidos.splice(nSplice,1);
    }
  }
 
  saveOptions(nIndex: number) {
    const oOp = this.aRideInGroup[nIndex];
    this.sRideOption = oOp.name;
  }

  get edtUserName() {
    return this.oForm.get('edtUserName');
  }

  get edtName() {
    return this.oForm.get('edtName');
  }

  get edtEmail() {
    return this.oForm.get('edtEmail');
  }

  get edtCity() {
    return this.oForm.get('edtCity');
  }

}
