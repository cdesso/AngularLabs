import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  // store session storage items in variables so they can be used on the html page.
  id = sessionStorage.getItem('id');
  username = sessionStorage.getItem('username');
  birthdate = sessionStorage.getItem('birthdate');
  age = sessionStorage.getItem('age');
  email = sessionStorage.getItem('email');

  constructor(private router: Router) { }

  ngOnInit(): void {
    // check if there is a used logged in.
    if (sessionStorage.getItem('id') == null){
      this.router.navigateByUrl('/login');
      
    }
  }
}
