import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Appartement} from "../_models/Appartement";

@Injectable({
  providedIn: 'root'
})
export class AppartementService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  addAppartement(appartement: Appartement, residenceId: number): Observable<any> {
    const params = new HttpParams().set('residenceId', residenceId.toString());
    return this.http.post<any>(`${this.baseUrl}/addApp`, appartement, {params});
  }

  getAppartementsByResidenceId(residenceId: number): Observable<Appartement[]> {
    return this.http.get<Appartement[]>(`${this.baseUrl}/residence/${residenceId}`);
  }
}
