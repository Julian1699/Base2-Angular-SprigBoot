import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginDto } from '../models/login-dto'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/api/v1/auth';
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // Generamos el token
  public generateToken(loginData: LoginDto): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, loginData);
  }

  // Obtenemos el usuario actual
  public getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/actual-usuario`);
  }

  // Iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token: string): boolean {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn(): boolean {
    const tokenStr = localStorage.getItem('token');
    return !(tokenStr == undefined || tokenStr == '' || tokenStr == null);
  }

  // Cerramos sesión y eliminamos el token del localStorage
  public logout(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // Obtenemos el token
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Guardamos el usuario en el localStorage
  public setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Obtenemos el usuario desde el localStorage
  public getUser(): any {
    const userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // Obtenemos el rol del usuario
  public getUserRole(): string {
    const user = this.getUser();
    return user && user.roles && user.roles.length > 0 ? user.roles[0].role : '';
  }

  // Guardamos el nombre de usuario en el localStorage
  public setUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  // Obtenemos el nombre de usuario desde el localStorage
  public getUsername(): string | null {
    return localStorage.getItem('username');
  }

}
