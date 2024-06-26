import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getReclamationsWithUserNames(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reclamations`);
  }
}
