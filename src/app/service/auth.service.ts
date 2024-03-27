import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdminWeb} from '../_models/AdminWeb';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInAdminKey = 'loggedInAdmin';
  private loggedInAdmin: AdminWeb | null = null;

  constructor(private httpClient: HttpClient) {
    const storedAdmin = localStorage.getItem(this.loggedInAdminKey);
    if (storedAdmin) {
      this.loggedInAdmin = JSON.parse(storedAdmin);
    }
  }

  adminLogin(adminWeb: AdminWeb): Observable<any> {
    return this.httpClient.post(`${baseUrl}/login`, adminWeb);
  }

  setLoggedInAdmin(admin: AdminWeb): void {
    this.loggedInAdmin = admin;
    localStorage.setItem(this.loggedInAdminKey, JSON.stringify(admin));
  }

  getLoggedInAdmin(): AdminWeb | null {
    return this.loggedInAdmin;
  }

  logout() {
    localStorage.removeItem(this.loggedInAdminKey);
    this.loggedInAdmin = null;
    return this.httpClient.post(`${baseUrl}/logout`, {});
  }
}
