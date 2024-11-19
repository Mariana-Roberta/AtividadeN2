import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import jwtDecode from 'jwt-decode';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isAutenticado: boolean = this.getAuthStatus();
  isAdmin: boolean = this.getAdminStatus();

  constructor(private router: Router, private http: HttpClient) {
  }

  logout(): void {
    localStorage.clear();
    this.setAuthState(false, false)
    this.router.navigate(['/']);
  }

  public setAuthState(authStatus: boolean, adminStatus: boolean): void {
    this.isAutenticado = authStatus;
    this.isAdmin = adminStatus;
    localStorage.setItem('authStatus', JSON.stringify(authStatus));
    localStorage.setItem('adminStatus', JSON.stringify(adminStatus));
  }

  getAuthStatus(): boolean {
    return JSON.parse(localStorage.getItem('authStatus') || 'false');
  }

  getAdminStatus(): boolean {
    return JSON.parse(localStorage.getItem('adminStatus') || 'false');
  }

  getUserDetails() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
    });

    // Faz a chamada ao backend para obter os detalhes do usuário
    return this.http.get('http://localhost:8080/user/profile', { headers });
  }
}
