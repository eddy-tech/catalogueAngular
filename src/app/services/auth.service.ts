import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[] = [
    {
      username: 'admin',
      password: '1234',
      roles: ['ADMIN'],
    },
    {
      username: 'albert',
      password: '1234', 
      roles: ['USER'],
    },
  ];

  public loggedUser?: string = ''; // PERMETTRE DE STOCKER LE USER CONNECTE
  public isloggedIn: boolean = false; // SI USER CONNECTE = true ELSE = FALSE
  public roles?: string[]; // TABLEAU QUI VA STOCKER LES ROLES DE USER QUI EST CONNECTE

  constructor(private router: Router) {}
  SignIn(user: User): boolean {
    let validUser: boolean = false;
    this.users.forEach((curUser) => {
      if (
        user.username === curUser.username &&
        user.password == curUser.password
      ) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', String(this.loggedUser)); // STOCKER LA VALEUR DE USER DANS LE localStorage
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }

  isAdmin(): boolean {
    if (!this.roles) return false; // this.roles = undefined | Il y a pas de roles
    return this.roles.indexOf('ADMIN') > -1; // LA CHAINE ADMIN EXISTE A PARTIR D'UN TABLEAU ROLE ET SI ELLE EXISTE PAS ELLE RETOURNE -1
  }

  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined;
    this.roles = undefined;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigateByUrl('/login');
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    this.getUserRoles(login);
  }

  getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if (curUser.username == username) {
        this.roles = curUser.roles;
      }
    });
  }
}
