import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router }  from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { VoyageServiceService } from '../service/VoyageService';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  isItemAvailable = true;
  public list = [];
  private searchedItem = [];
  constructor( private router : Router, public service: VoyageServiceService) {


    this.getVoyageList();

   }
   

  ngOnInit() {
   
  }

  getVoyageList(){
    this.service.getVoyage().subscribe(list => {
         
      let array = list.map(item => {
        return {
          key: item.key,
          ...item.payload.val()
        };
      });

      this.list = array;
      this.searchedItem = this.list;
      console.log(this.searchedItem);

    }, err => {
      console.log(err);
    }) 
  }

  ticket(item){
    let navigationExtras: NavigationExtras = { state: { data: item } };
    this.router.navigate(['tiket-dialog'], navigationExtras);
  }
  ///paye-ticket
   /* ionViewDidEnter() {
    setTimeout(() => {
      this.search.setFocus();
     });
  } */



     //this.search.getInputElement().then(item => console.log(item))
  
 
     

     initializeItems(){
         this.searchedItem = this.list;
     }

     getItems(ev: any) {
         // Reset items back to all of the items
         this.searchedItem = this.list;
         this.isItemAvailable = true;

         // set val to the value of the searchbar
         const val = ev.target.value;

         // if the value is an empty string don't filter the items
         if (val && val.trim() !== '') {
             this.isItemAvailable = true;
             this.searchedItem = this.searchedItem.filter((item) => {
                 return (item.ligne.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.stationarrivee.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.stationdepart.toLowerCase().indexOf(val.toLowerCase()) > -1);
             })
         } else {
             this.isItemAvailable = false;
         }
     }
search(){
    this.router.navigate(['/search-voyage']);
   }
}
