// translate.component.ts
import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from '../../service/language.service'

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit{
  lang:string ='';
  ngOnInit(): void{
    this.lang = localStorage.getItem('lang') || 'fr';
  }
  constructor(
    private translateService:TranslateService,
    private languageService: LanguageService // inject the shared service
  ) {  }
  ChangeLang(lang:any){
    const selectedlanguage = lang.target.value;
    localStorage.setItem('lang',selectedlanguage);
    this.translateService.use(selectedlanguage);
    this.languageService.setLanguage(selectedlanguage); // update the shared service
    console.log(this.translateService.getDefaultLang());
    console.log(this.translateService.currentLang);

    this.translateService.get('test').subscribe((message: string) => {
      console.log(message);
    })
  }
}
