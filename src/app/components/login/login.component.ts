import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = new User();
  erreur = 0;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  onLoggedIn() {
    console.log(this.user);
    let isValidUser: boolean = this.authService.SignIn(this.user);
    if (isValidUser) this.route.navigateByUrl('/');
    // else alert('Login ou password incorrect !');
    else this.erreur = 1;
  }
}
