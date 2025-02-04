import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
//URL to allow server access
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";
  error = "";
  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    // if the user is already logged in, alert and route to account page.
    if (sessionStorage.getItem('id') != null){
      alert('You are already logged in');
      this.router.navigateByUrl('/account');
    }
  }

  submit(){
    // send user variables to server and subscribe to the data returned. 
    // if data is returned with a valid value of true, reset error message, 
    // put data in session storage and route to account page.
    // else, prompt incorrect inputs and reset input fields.

    let user = {username: this.username, pwd: this.password};
    this.httpClient.post(BACKEND_URL + '/api/auth', user, httpOptions).subscribe((data:any)=>{
      if (data.valid){
        this.error = ""
        sessionStorage.setItem('id', data.id);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('birthdate', data.birthdate);
        sessionStorage.setItem('age', data.age.toString());
        sessionStorage.setItem('userlogin', data.valid.toString());
        sessionStorage.setItem('email', data.email);

        this.router.navigateByUrl('/account');
      }
      else {
        this.error = "Invalid username or password"
        this.username = "";
        this.password = "";
      }
    });
  }
}