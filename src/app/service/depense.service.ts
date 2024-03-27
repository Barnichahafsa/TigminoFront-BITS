import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Depense} from "../_models/Depense";

@Injectable({
  providedIn: 'root'
})
export class DepenseService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getDepenses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllDepenses`);
  }

  updateDepenseChecked(id: number, depense: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/checkdepense/${id}`, depense);
  }

  getDepenseById(id: string): Observable<Depense> {
    const url = `${this.baseUrl}/depense/${id}`;
    return this.http.get<Depense>(url);
  }


}
