import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MobUser} from "../_models/MobUser";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:8080';


@Injectable({
  providedIn: 'root'
})
export class MobUserService {


  constructor(private http: HttpClient) {
  }

  addUser(newUser: any, apartmentId: number) {
    const params = {selectedApartmentId: apartmentId.toString()};
    return this.http.post<any>(`${baseUrl}/add`, newUser, {params});
  }

  getUsersByType(userType: string): Observable<MobUser[]> {
    return this.http.get<MobUser[]>(`${baseUrl}/getUsersByType?type=${userType}`);
  }

  getAllUsersWithDetails(): Observable<MobUser[]> {
    return this.http.get<MobUser[]>(`${baseUrl}/coproprietaires`);
  }

  getAllAgentsWithDetails(): Observable<MobUser[]> {
    return this.http.get<MobUser[]>(`${baseUrl}/agents`);
  }


  getAllUsers(): Observable<MobUser[]> {
    return this.http.get<MobUser[]>(`${baseUrl}/getAllUsers`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/deleteUser/${id}`);
  }

  getUserById(id: number): Observable<MobUser> {
    return this.http.get<MobUser>(`${baseUrl}/${id}`);
  }
}
