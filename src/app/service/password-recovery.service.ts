import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {
  private apiUrl = '/forgot-password';


  constructor(private http: HttpClient) {
  }

  initiatePasswordRecovery(contact: string) {
    return this.http.post(this.apiUrl, {contact});
  }

}

export class PasswordRecoveryPasswordService {
}
