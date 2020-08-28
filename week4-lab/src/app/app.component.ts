import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})
export class AppComponent {
  title = 'week4-lab';

  constructor(private router: Router) { }

  logout(){
    // Log out function, check for login, if not exists, alert and do nothing, 
    // if exists, clear session storage, alert and logout
    if (sessionStorage.getItem('id') == null){
      alert('You are not logged in')
    }
    else{
      sessionStorage.clear()
      alert('Successfully Logged out')
      this.router.navigateByUrl('/login');
    }
  }
}
