import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";
  error = "";
  users = [
    {'email': 'casper@mail.com', 'pwd': 'abc123'}, 
    {'email': 'john@mail.com', 'pwd': 'abc123'}, 
    {'email': 'david@mail.com', 'pwd': 'abc123'}];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  submit(){
    for (let i=0; i<this.users.length; i++){
      if (this.username == this.users[i].email && this.password == this.users[i].pwd){
        this.error = ""
        this.router.navigateByUrl('/account');
      }
      else{
        this.error = "Invalid username or password"
        this.username = "";
        this.password = "";
      }
  }
  }
}
