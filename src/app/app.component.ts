import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'catalog-frontend';

  constructor(public authService: AuthService, private route: Router) {}

  ngOnInt() {
    let isloggedIn: any;
    let loggedUser: any;
    isloggedIn = localStorage.getItem('isloggedIn');
    loggedUser = localStorage.getItem('loggedUser');
    if (isloggedIn != true || !loggedUser) this.route.navigateByUrl('/login');
    else this.authService.setLoggedUserFromLocalStorage(loggedUser);
  }

  onLogout() {  
    this.authService.logout();
  }
}
