import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Residence} from "../_models/Residence";

const baseUrl = 'http://localhost:8080';


@Injectable({
  providedIn: 'root'
})
export class ResidenceService {


  constructor(private http: HttpClient) {
  }

  getAllResidences(): Observable<Residence[]> {
    return this.http.get<Residence[]>(`${baseUrl}/residences`);
  }


}
