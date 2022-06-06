import { Injectable } from '@angular/core';
import { FormGroup, FormControl,Validators} from "@angular/forms";
//import { Firebase } from '@angular/fire';
import { AngularFireList }  from '@angular/fire/database';
//import * as firebase from 'firebase';
//import * as firebase from 'firebase/app';
//import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BusServiceService {

  constructor( private firebase: AngularFireDatabase ) { }
  busList: AngularFireList<any>;


  public form: FormGroup = new FormGroup({
    key: new FormControl(null),
    numS: new FormControl('',Validators.required),
    marque: new FormControl(''),
    modele: new FormControl(''),
    nbrVoy: new FormControl(''),
    nbrP: new FormControl('',Validators.required),
    dateMiseS: new FormControl(''),
    statut: new FormControl(true),
    disPar: new FormControl(''),
    voyAc: new FormControl(true), 
    wifi: new FormControl(true),
    clim: new FormControl(true),
  });
  initializeFormGroup(){
    this.form.setValue({
      key: null,
      numS: '',
      marque:'',
      modele:'',
      nbrVoy:'',
      nbrP:'',
      dateMiseS:'',
      statut:true,
      disPar:'',
      voyAc:true,
      wifi: true,
      clim: true,
    })
  }
  
  getBus() {
    this.busList = this.firebase.list('bus');
    return this.busList.snapshotChanges();
  }
  
  insertBus(bus) {

    this.busList.push(bus).then(()=> {
      console.log("Add successfully");
    }); 

  }
  
  updateBus(bus) {
    this.busList.update(bus.key,
      {
        numS: bus.numS,
        marque:bus.marque,
        modele:bus.modele,
        nbrVoy:bus.nbrVoy,
        nbrP:bus.nbrP,
        dateMiseS:bus.dateMiseS,
        statut:bus.statut,
        disPar:bus.disPar,
        voyAc:bus.voyAc,
        wifi:bus.wifi,
        clim:bus.clim,
      });
   }

   deleteBus($key: string) {
    this.busList.remove($key);
  }


  getOneBus(key) {
    console.log(key);
    
    this.busList = this.firebase.list('bus/' + key);
    return this.busList.snapshotChanges();
  }

  populateForm(bus: any){
    console.log("Populating the form");
    this.form.setValue(bus);
    // this.form.setValue(_.omit(bus,''));
  }
  
}
