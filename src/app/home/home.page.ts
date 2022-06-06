import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { VoyageServiceService } from '../service/VoyageService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public list: Array<Object> = [];
  private searchedItem: any;


  defaultShownVoyageNumer = 4;

  constructor( private router : Router, public service: VoyageServiceService ) {
  }

  ngOnInit() {
    this.getVoyageList(this.defaultShownVoyageNumer);
  }

  getVoyageList(limit){
    this.service.getVoyageListLimit(limit).once('value', (snapshot: any) => {

      var data = snapshot.val();
      // this.list = array;
      // this.searchedItem = this.list;
      
      // console.log(data);

      snapshot.forEach(element => {
        //console.log(element.val());
        
        this.list.push(element.val());

      });

      this.searchedItem = this.list;
      

    }, err => {
      console.log(err);
    })      
  }
   
  Retour() {
    this.router.navigate(['/login']);
   }
  
   ticket(item){
    let navigationExtras: NavigationExtras = { state: { data: item } };
    this.router.navigate(['tiket-dialog'], navigationExtras);
  }
}
