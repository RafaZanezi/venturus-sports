import { Component, OnInit } from '@angular/core';
import { TableDataService } from '../services/table-data.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  aUsers: Array<any>;
  aAlbuns: Array<any>;
  aFotos: Array<any>;
  aPosts: Array<any>;
  aDias: Array<any>;
  aRideInGroup: Array<any>;
  nIdUser: number;

  constructor(
    private oTableService: TableDataService,
    private oUserService: SharedService
  ) { }

  ngOnInit() {
    this.carregarMocks();
    this.carregarDados();
  }

  remover() {
    const nIndex = this.aUsers.findIndex(item => item.id === this.nIdUser);
    if (nIndex >= 0) {
      this.aUsers.splice(nIndex, 1);
    }
  }

  private carregarMocks() {
    this.oUserService.daysOfWeek().subscribe(res => this.aDias = res);
    this.oUserService.rideInGroup().subscribe(res => this.aRideInGroup = res);
  }

  private carregarDados() {
    this.oTableService.buscarUsuarios().subscribe(res => {
      this.aUsers = res.concat(this.oUserService.aNewUsers);
      this.oUserService.nUsersLength = this.aUsers.length;

      this.oTableService.buscarAlbuns().subscribe(res => {
        this.aAlbuns = res

        this.oTableService.buscarFotos().subscribe(res => {
          this.aFotos = res;

          this.oTableService.buscarPosts().subscribe(res => {
            this.aPosts = res;

            this.aUsers.forEach(user => {
              const aUserAlbum: Array<any> = this.aAlbuns.filter(album => album.userId == user.id) || [];
              const aUserPhotos = this.aFotos.filter(fotos => aUserAlbum.some(album => album.id === fotos.albumId)) || [];
              const aUserPosts: Array<any> = this.aPosts.filter(post => post.userId === user.id) || [];

              user.albums = aUserAlbum.length;
              user.photos = aUserPhotos.length;
              user.posts = aUserPosts.length;

              if (!user.dayOfWeek) {
                user.dayOfWeek = new Array<any>();

                var randDay = this.aDias[Math.floor(Math.random() * this.aDias.length)];

                if (randDay.index === 1) {
                  user.dayOfWeek.push({ name: 'Every day' });
                } else {
                  for (let i = randDay.index; i <= this.aDias.length; i++) {
                    const oDay = this.aDias.find(item => item.index == i);
                    user.dayOfWeek.push(oDay);
                  }
                }
              }

              if(!user.rideOption) {
                var randRideOption = this.aRideInGroup[Math.floor(Math.random() * this.aRideInGroup.length)];
                user.rideOption = randRideOption.name;
              }
            });
          });
        });
      });
    });
  }

}
