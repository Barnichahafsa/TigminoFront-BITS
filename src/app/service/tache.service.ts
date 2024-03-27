import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Tache} from "../_models/Tache";

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class TacheService {


  constructor(private http: HttpClient) {
  }

  addTask(id: number, tache: Tache): Observable<Tache> {
    return this.http.post<Tache>(`${baseUrl}/addTask/${id}`, tache);
  }


}
