import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdminWeb} from '../_models/AdminWeb';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AdminWebService {


  constructor(private http: HttpClient) {
  }

  register(webAdmin: AdminWeb): Observable<AdminWeb> {
    return this.http.post<AdminWeb>(`${baseUrl}/register`, webAdmin);
  }

  getAllAdmins(): Observable<AdminWeb[]> {
    return this.http.get<AdminWeb[]>(`${baseUrl}/getAllAdmins`);
  }

  deleteAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/delete/${id}`);
  }


  updateAdmin(id: number, admin: AdminWeb): Observable<any> {
    return this.http.put(`${baseUrl}/update/${id}`, admin);
  }

  getAdminById(id: string): Observable<AdminWeb> {
    const url = `${baseUrl}/admin/${id}`;
    return this.http.get<AdminWeb>(url);
  }


}
