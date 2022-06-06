import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from '@angular/fire/database';
import {  AngularFirestore } from '@angular/fire/firestore';

import { User } from '../Models/user/User';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor( private firestore: AngularFirestore) { }


   // Adding user details to firestore with uid reference
   addUserToFirestore(user: User ){
    return this.firestore.doc('users/' + user.uid).set(user);
  } 



  // Getting user details from firestore with uid reference
  getUserFromFirestore(uid) {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }

  // Later
  // Edit user details from firestore with uid reference
  editUserFromFirestore(uid) {

  }

}
