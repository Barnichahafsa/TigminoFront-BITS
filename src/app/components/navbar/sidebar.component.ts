import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Subscription} from "rxjs";
import {LanguageService} from "../../service/language.service";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from 'src/app/service/auth.service';
import {Router} from "@angular/router";
import {AdminRole, AdminWeb} from "../../_models/AdminWeb";
import {Residence} from "../../_models/Residence";
import {ResidenceService} from "../../service/residence.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DatePipe]
})
export class SidebarComponent implements OnInit, OnDestroy {
  loggedInAdmin: AdminWeb | null = null;
  residences: Residence[] = [];
  myDateFormatted: string | null | undefined;
  myHourFormatted: string | null | undefined;
  protected readonly AdminRole = AdminRole;
  private subscription!: Subscription;

  constructor(private authService: AuthService, private ResidenceService: ResidenceService, private router: Router, private languageService: LanguageService, private datePipe: DatePipe, private translateService: TranslateService) {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loggedInAdmin = this.authService.getLoggedInAdmin();
    this.getResidences();
    this.updateDateTime(); // Initial update
    setInterval(() => this.updateDateTime(), 1000);
    this.subscription = this.languageService.language$.subscribe(language => {
      this.translateService.use(language);
    });
  }

  getResidences() {
    this.ResidenceService.getAllResidences().subscribe(
      (res: Residence[]) => {
        this.residences = res;
      },
      error => {
        if (error.status === 404) {
          alert('Residences not found.');
        } else {
          alert(`Failed to get residences: ${error.message}`);
        }
      }
    );
  }

  getResidenceName(): string | undefined {
    return this.residences.find(residence => residence.syndic?.id === this.loggedInAdmin?.id)?.nom;
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        console.log('Logged out successfully');
        this.router.navigate(['/']);

      },
      error => {
        console.error('Error logging out:', error);
      }
    );
  }

  private updateDateTime(): void {
    const now = new Date();
    this.myDateFormatted = this.datePipe.transform(now, 'yyyy-MM-dd');
    this.myHourFormatted = this.datePipe.transform(now, 'HH:mm:ss')
  }
}
