import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router }  from '@angular/router';
import { VoyageServiceService } from '../service/VoyageService';

// Ticket model 
export interface Ticket {
  ticketId: string, 
  userKey?: string, 
  dateReservation: number, 
  ticket: {
    clientData: any,
    price: number
  }
} 
@Component({
  selector: 'app-tiket-dialog',
  templateUrl: './tiket-dialog.page.html',
  styleUrls: ['./tiket-dialog.page.scss'],
})
export class TiketDialogPage implements OnInit {
  public list = [];
   voyageData: any;
   private searchedItem = [];
   passagerTypes: any[] = [{
    voyagerType: 'Majeur',
    reductionPercentage: 0, // reduction percentage  ?% 
  },{
    voyagerType: 'Enfant',
    reductionPercentage: 75, // reduction percentage  ?% 
  },{
    voyagerType: 'Police',
    reductionPercentage: 25, // reduction percentage  ?% 
  },{
    voyagerType: 'Handicapé',
    reductionPercentage: 100, // reduction percentage  ?% 
  } ];

pickedPassagerType: any = this.passagerTypes[0];

 // final price the ticket 
 finalPrice: number = 0;

  private selectAll: boolean = false;

  private form = [
    { val: 'Pepperoni', isChecked: false },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];


  constructor(private route: ActivatedRoute,  private router : Router, public service : VoyageServiceService) {

   
    this.route.queryParams.subscribe(() => {
      var v = this.router.getCurrentNavigation().extras.state;
      if (v) {
        console.log(v);
        this.voyageData= v.data;

        // Set final price the same as ticket's price  
        this.finalPrice = this.voyageData.tarifs;
      }
       
    });

   }

  ngOnInit() {
    
    // CALL CALCULATE FINAL PRCOE FUNCTION
    this.calculateFinalPrice();
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


  //
  payer(item){
     
    var dateReservation_ = Date.now(); 
    var ticketId_ = this.createID();
    var tempData = this.pickedPassagerType; 
    delete tempData.isSelected; // removing isSelected key w
    var clientData_ = tempData;
    
  
    var ticket: Ticket = {
      ticketId: ticketId_,
      dateReservation: dateReservation_, 
      ticket: {
        clientData: clientData_,
        price: this.finalPrice
      }
    }
    
    let navigationExtras: NavigationExtras = { 
      state: { 
        data: {
                ticket : ticket ,
                voyage : this.voyageData
              }
              } 
            };
    this.router.navigate(['/paye-ticket'], navigationExtras);


  }

  createID() {
    return Array(16)
      .fill(0)
      .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
      .join('') + 
      Date.now().toString(24);
  }


  initializeItems(){
    this.searchedItem = this.list;
}
  _ionChange(event) {
    console.log(event)
  }

  _selectAll() {
    this.form.map(item => {
      item.isChecked = !this.selectAll
      return item
    });
  }

  _everyElement(selected) {
    this.form.forEach(item => {
      if (item.val == selected.value)
        item.isChecked = !selected.isChecked
    })

    setTimeout(() => {
      if (this.form.every(item => item.isChecked == true))
        this.selectAll = true;
      else if (this.form.some(item => item.isChecked == false))
        this.selectAll = false;
    }, 100);

  }
  onchange($event){
    
    //console.log($event)
    this.pickedPassagerType = $event.detail.value;
    console.log(this.pickedPassagerType);
    //console.log("***********");
    this.calculateFinalPrice();
    //console.log("***********");

    // Calculate the final price 
    // Error when picking "mineur" , "majeur" 
  }
  
   calculateFinalPrice() {
    console.log("Final price", this.finalPrice);
  
    var ticketPrice = this.voyageData.tarifs;
  
    this.finalPrice = ticketPrice - ( (ticketPrice * this.pickedPassagerType.reductionPercentage) / 100);
    console.log("Price after reduction", this.finalPrice);
   }
   //passager
 _passagerlist:passager[];
 getpassagers(){
   console.log("**********");
   this._passagerlist=[
     {id:1,name:"Enfant",isselected:false},
     {id:2,name:"Majeur",isselected:false},
     {id:3,name:"Handicapé",isselected:false},
     {id:4,name:"Police",isselected:false},
   ]
 }


 
}
class passager {
  id: number;
  name: string;
  isselected: boolean;
}

