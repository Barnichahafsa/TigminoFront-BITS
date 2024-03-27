import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe],
})
export class AppComponent {
  title = 'Tigmino';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('fr');
    this.translateService.use(localStorage.getItem('lang') || 'fr')
  };
}
