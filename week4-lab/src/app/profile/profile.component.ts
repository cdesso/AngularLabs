import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
//URL to allow server access
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id = sessionStorage.getItem('id');
  username = sessionStorage.getItem('username');
  birthdate = sessionStorage.getItem('birthdate');
  age = sessionStorage.getItem('age');
  email = sessionStorage.getItem('email');
  

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    // check if a used is logged in
    if (sessionStorage.getItem('id') == null){
      this.router.navigateByUrl('/login');
      
    }
  }
  submit(){
    // put session storage variables declared earlier into an object, send to server 
    // and subscribe to the data returned, replace returned data in session storage,
    // route to account page.
    let user = {id: this.id, username: this.username, birthdate: this.birthdate, email: this.email};
    this.httpClient.post(BACKEND_URL + '/editprofile', user, httpOptions).subscribe((data:any)=>{
         sessionStorage.setItem('username', data.username);
         sessionStorage.setItem('birthdate', data.birthdate);
         sessionStorage.setItem('email', data.email);

         this.router.navigateByUrl('/account');
    });
  }
}
