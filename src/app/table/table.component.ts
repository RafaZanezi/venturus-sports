import { Component, OnInit } from '@angular/core';
import { TableDataService } from '../services/table-data.service';

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

  constructor(private oTableService: TableDataService) { }

  ngOnInit() {
    this.carregarMocks();

    this.oTableService.buscarUsuarios().subscribe(res => {
      this.aUsers = res;

      // this.oTableService.buscarAlbuns().subscribe(res => {
          // this.aAlbuns = res

          this.oTableService.buscarFotos().subscribe(res => {
            this.aFotos = res;

            this.oTableService.buscarPosts().subscribe(res => {
              this.aPosts = res;
  
              this.aUsers.forEach(user => {
                user.posts = this.aPosts.filter(post => post.userId === user.id).length;
                // user.albuns = this.aAlbuns.filter(album => album.userId == user.id).length;
              });
            });
          });

        // });
    });
  }

  private carregarMocks() {
    this.oTableService.daysOfWeek().subscribe(res => this.aDias = res);
    this.oTableService.rideInGroup().subscribe(res => this.aRideInGroup = res);
  }

}
