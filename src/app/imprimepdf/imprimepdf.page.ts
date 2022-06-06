import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';

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

const MEDIA_FOLDER_NAME = 'Gestion transport tickets';

@Component({
  selector: 'app-imprimepdf',
  templateUrl: './imprimepdf.page.html',
  styleUrls: ['./imprimepdf.page.scss'],
})
export class ImprimepdfPage implements OnInit {

  voyageData: any;

  @ViewChild("contentToConvert") contentToConvert: ElementRef;


  constructor(private route: ActivatedRoute, private router : Router,
    private base64ToGallery: Base64ToGallery, private file: File,
    private plt: Platform, 
    ) {  
    this.route.queryParams.subscribe(() => {
      var v = this.router.getCurrentNavigation().extras.state;
      if (v) {       
        console.log(v);
 
        this.voyageData= v.data;
 
        console.log(this.voyageData);
 
      
      }
       
    });}

  ngOnInit() {

    this.plt.ready().then(() => {
      
    });

  } 


 public convertToPDF() {

  // console.log(this.contentToConvert);
 
    var data = document.getElementById('contentToConvert');

    const options = { background: 'white', height: 845, width: 595 };

    domtoimage.toPng(data, options).then(async (base64Data) => {
 
      // console.log(base64Data);
          
      const response = await fetch(base64Data);
      const blobFile = await response.blob();
     
      // console.log(blobFile);


      let ticketName = `ticket_${this.voyageData.ticket.ticketId}.jpg`;

      let path = this.file.externalRootDirectory;
      // let path = this.file.dataDirectory;

      let copyTo = path + MEDIA_FOLDER_NAME;

      this.file.checkDir(path, MEDIA_FOLDER_NAME).then(
        () => {
          console.log("Foler exists");

          // alert("Folder exist");


          this.file.writeFile(copyTo, 
            ticketName, 
            blobFile,
            {
              replace: false,
            }).then(data => {
      
              // alert("Ticket saved" + JSON.stringify(data));
             alert("Ticket saved successfully!");

              // alert("Go to main app");

              this.router.navigate(['home']);

      
            }).catch(err => {
             //   alert("Error downloading ticket 1" + JSON.stringify(err));
            alert("Error downloading ticket");

            })

            
        },
        err => {
         // alert("Folder not exist, create new one");

          this.file.createDir(path, MEDIA_FOLDER_NAME, false).then(()=> {
 
            this.file.writeFile(copyTo, 
              ticketName, 
              blobFile,
              {
                replace: false,
              }).then(data => {
        
                // alert("Ticket saved" + JSON.stringify(data));
                alert("Ticket saved successfully!");

                // alert("Go to main app");
                this.router.navigate(['home']);


              }).catch(err => {
                // alert("Error downloading ticket 2" + JSON.stringify(err));
                alert("Error downloading ticket");
              })
        

          }).catch(err => {
            // alert("Error creating folder " + JSON.stringify(err));
          });

        }
      );


     
      
    });
  
}
 

/*

      let options: Base64ToGalleryOptions = {
        prefix: 'img',
        mediaScanner: false
      }

 this.base64ToGallery.base64ToGallery(base64Data, options).then(
        res => {

          console.log('Saved image to gallery ', res)
          alert('Saved image to gallery ' + JSON.stringify(res));
          alert('Go back to main page');

      },
        err => {
          console.log('Error saving image to gallery ', err)
          alert('Error saving image to gallery ' + JSON.stringify(err));
      }
      );
      
*/

}
