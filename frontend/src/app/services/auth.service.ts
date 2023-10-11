import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/api/models/user';
import { Router } from '@angular/router';
/*
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  constructor(
    private router: Router, 
    private userService: UserService,
    private storage: Storage
    ) { 
      this.storage.create();
    }

  // Método para autenticar al usuario
  login(username: string, password: string): Observable<boolean> {
    return new Observable((observer) => {
      this.userService.userLoginCreate$FormData(
          {
            body: {
              username: username,
              password: password,
            }
          }).subscribe({
          next: (user) => {
            this.setUser(user);
            observer.next(true);
          },
          error: (e) => {
              console.error(e);
              observer.next(false);
          },
          complete: () => {
              this.isAuthenticated = true;
              observer.complete();
          }
      });
    });
  }


  // Método para desautenticar al usuario
  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getUser(): Promise<User>{
    return this.storage.get('user');
  }

  setUser(user: User){
    this.storage.set('user', user);
  }
}
*/