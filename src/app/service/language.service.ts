import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new Subject<string>();
  language$ = this.languageSubject.asObservable();

  setLanguage(language: string) {
    this.languageSubject.next(language);
  }
}
