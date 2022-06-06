import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/service/LoginService';
import { ResolveStart,RouterLink } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { UsersServiceService } from 'src/app/service/UsersService';

import { User } from '../Models/user/User';
import { Roles } from '../Models/role/Role';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  dataLoader: boolean = false;

  isSignedIn = false
  constructor( public loginService: LoginServiceService,private router : Router, public usersService:UsersServiceService ) { }

  ngOnInit() {
    
    if(localStorage.getItem('user')!== null)
      this.isSignedIn= true
    else 
      this.isSignedIn= false
  }
  
  onSignup(email: string, password: string){
    console.log("Signin' up");

    this.loginService.signup(email,password).then( (res: any) => {

      console.log('User Data');
      console.log(res.user);

      var userRole: Roles = {
        admin: true,
        subscriber: true, 
        editor: true
      } 

      // we have to change name and role dynamically (nevermind xd ) 
      var dummyUserDetails: User = {
        uid: res.user.uid,
        name: 'Ryhem', 
        roles: userRole
      }
      
      this.usersService.addUserToFirestore(dummyUserDetails).then(data => {
        console.log("Adding user to firestore document");
        console.log(data);
      }, err => {
          console.log(err);
      })
       
    }, err => {
      // Handling Errors
      console.log(err);
    } )

  }

  // LOGIN METHOD
  onSignin(email:string,password:string){
    // console.log("Signin' in");

    this.dataLoader = true;


    this.loginService.signin(email,password).then( (res: any) => {
      // IN CASE THE USER IS ALREADY EXIST
      // console.log('User Data');
       // console.log(res.user);

       var userId = res.user.uid;
       // Retrieve user details from firestore
       // console.log("Getting data for", userId);
       
       this.usersService.getUserFromFirestore(userId).subscribe(data => {
      
        this.dataLoader = false;

          // console.log(data);
          
          // console.log('Redirection to home page with angular Authguard activated');
          // SAVING THE USER IN THE STORAGE.
          // hna najmou nbadlou fel user ltsajel f storage, ama men ba3d enti w authguard, l 7asilou hhh 
          this.loginService.saveUserStorage(data);

          // REDIRET USER TO HOME PAGE
          setTimeout(() => {
            this.router.navigate(["home"]); 
          },100 );
       
      }, err => {
        this.dataLoader = false;

        console.log(err);
       })

            

    }, err => {
      // IN CASE USER IN NOT FOUND 
      // ANALYSING ERRORS - SHOWING POPUP MESSAGE - no record found
      console.log(err.message);
      // BEAUTIFY THIS LATER hak bech thcoufi l alert makhiebha taw tbadel rayek hhh hhh behy
      alert(err.message);
      this.dataLoader = false;

    })

  }

  // For testing purposes
  getUserFirestore(uid) {
    console.log("Getting data for", uid);
    this.usersService.getUserFromFirestore(uid).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }


  handleLogout(){
    return this.loginService.logout();
  }
  
  Login(){
    this.router.navigate(['/home']);
  }
}
