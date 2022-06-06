import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router }  from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  selector: 'app-paye-ticket',
  templateUrl: './paye-ticket.page.html',
  styleUrls: ['./paye-ticket.page.scss'],
})

export class PayeTicketPage implements OnInit {
  voyagesList = [];
  selectVoyageValueEnabled: boolean = false;
  dummyVoyage: any;

  voyage:any;
  voyageData: any;
  public list = [];
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

selectMatriculeValueEnabled: boolean = false;
  selectVillearriveeValueEnabled: boolean = false;
  voyageList= [];
 private selectAll: boolean = false;
 voyageListArray: any[];

  // AVAILABLE PLACES 
  availablePlaces: number = 0;
  
 private form = [
   { val: 'Pepperoni', isChecked: false },
   { val: 'Sausage', isChecked: false },
   { val: 'Mushroom', isChecked: false }
 ];


 constructor(private route: ActivatedRoute,  private router : Router, public voyageService: VoyageServiceService, public alertController: AlertController ) {

  
   this.route.queryParams.subscribe(() => {
     var v = this.router.getCurrentNavigation().extras.state;
     if (v) {       
       console.log(v);

       this.voyageData= v.data;

       console.log(this.voyageData);

     
     }
      
   });

  }
  

 ngOnInit() {
   
   // CALL CALCULATE FINAL PRCOE FUNCTION
  
 }
 getVoyageList(){
  this.voyageService.getVoyage().subscribe(list => {
       
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
 
   //console.log("***********");

   // Calculate the final price 
   // Error when picking "mineur" , "majeur" 
 }

 async presentAlertConfirm() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirmer Réservation !',
    message: '',
    buttons: [
      {
        text: 'Non',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Oui',
        handler: () => {
          
          console.log('Confirm Okay');
           
 
    
  
  
          var givemedata = true;

          // Get voyage and sous voyages
     
          if(givemedata) {
           this.voyageService.getVoyageValue().subscribe( list => {
     
             if(!givemedata) return;
     
           
     
             let array = list;
     
             console.log(array);
     
             console.log("--------------");
             
     
             console.log(this.voyageData);
             
             
             console.log("--------------");
             
     
             var exactTrips = this.getExactTrips(this.voyageData.voyage.key, array);
     
             if(exactTrips.length==0) {
               console.log("Something went wrong");
               return;
             }
     
     
             console.log("EXact trips");
             console.log(exactTrips);
     
      
             // update all exact trips 
     
             exactTrips.forEach(element => {
     
               let updateKey = element.key;
     
               console.log(element);
     
               
                   // Checking if there are places left on the bus
                   var dummyElement = JSON.parse(JSON.stringify(element));
                   // console.log(Object.keys(dummyElement));
                   
                   // console.log(dummyElement);
       
                   
                   if(dummyElement.nombreplacedisponible > 0) {
     
                     // UPDATE voyage
                     dummyElement.nombreplacedisponible -= 1;
                     dummyElement.nombreplacereservee += 1;
                     // console.log("After updating trip");
                     // console.log(dummyElement);
     
                     // ADD tiket to ticekts colelction
                     if(dummyElement.tickets) {
                       // Adding ticket if tickets collection already exists
                       console.log("Ticket collection exists");
                       dummyElement.tickets.push(this.voyageData.ticket);
                     }
                     else {
                       // create new tickets table and add ticket to it
                       console.log("Ticket collection not exists, creating new one");
                       dummyElement.tickets = [this.voyageData.ticket];
                     }
     
                     console.log(dummyElement);
           
                     this.voyageService.updateVoyageTicket(dummyElement);
                     // this.voyageService.updateVoyage(dummyElement);
     
                 
                   }else {
                     console.log("There is no places left for this trip");
                     //this.presentAlertNoPlace();
                   }
             })


             givemedata = false; 
      
             this.presentAlertConfirmPDF();
           }, err => {
             console.log(err);
           }) 
         }








          
        }
      }
    ]
  });

  await alert.present();
}

  async presentAlertConfirmPDF() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'votre réservation a été prise en compte!',
      message: 'Télécharger votre ticket !!!',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.home();

          }
        }, {
          text: 'Oui',
          handler: () => {
            console.log('Confirm Okay');
            this.ticket();

          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertNoPlace() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No place dispo !',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
           // this.ticket();

          }
        }
      ]
    });

    await alert.present();
  }

 bookTicket() {
  console.log("booking ticket");
   
  this.presentAlertConfirm();
return;
  var r = confirm("Confirmation de reservation!");
  if (r == true) {



  }



}
 

// Get trips with the same key or voyageParent key as the voaygeTicketKey
getExactTrips(ticketKey, array) {

	// console.log(array);
  
  var lookup = []; // Temp array to hold the trips
  
  for (var i=0; i<array.length; i++) {
  
    let v = array[i];
		
    if(v.key == ticketKey) {
    
      if(v.voyageParent == "") {

      // Have no childs
      	console.log("have no childs")
        
        // Get all childs with the same key if exists
        let y = v.key;
        for (var j=0; j<array.length; j++) {
  
    			let vvv = array[j];
          
        	if( (vvv.key == y) || (vvv.voyageParent == y)) {
          	// console.log(vvv);
            lookup.push(vvv);
          }
          
        }
        

      } else {

			console.log("have childs")
        // Have childs
        let x = v.voyageParent;
        console.log(x);
        // Looking for any trip key =  x or voayegParent = x
        
        for (var k=0; k<array.length; k++) {
  
    			let vv = array[k];
          
        	if( (vv.key == x) || (vv.voyageParent == x)) {
          	// console.log(vv);
            lookup.push(vv);
          }
          
        }
				
      }
    
    }
    
    
  }

	return lookup;
}


home(){

   this.router.navigate(['/home']);
 }
ticket(){

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
      data: this.voyageData
            } 
          };
  this.router.navigate(['/imprimepdf'], navigationExtras);
  // this.router.navigate(['/imprimepdf']);
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


createID() {
  return Array(16)
    .fill(0)
    .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
    .join('') + 
    Date.now().toString(24);
}
}
class passager {
 id: number;
 name: string;
 isselected: boolean;
}