import {Component, Inject, Input, OnInit} from '@angular/core';
import {AdminWebService} from "../../service/web-admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminWeb} from "../../_models/AdminWeb";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-update-web-admin',
  templateUrl: './update-web-admin.component.html',
  styleUrls: ['./update-web-admin.component.css'],
})
export class UpdateWebAdminComponent implements OnInit {
  @Input() currentAdmin: AdminWeb = new AdminWeb();
  public showSuccessMessage!: boolean;
  public errorMessage!: string;
  public showErrorMessage!: boolean;
  public successMessage!: string;
  private id!: string;

  constructor(@Inject(DOCUMENT) private document: Document, private service: AdminWebService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.service.getAdminById(this.id).subscribe(
        (admin: AdminWeb) => {
          this.currentAdmin = admin;
          this.currentAdmin.date_start_passkey = new Date(admin.date_start_passkey);
          this.currentAdmin.date_end_passkey = new Date(admin.date_end_passkey);
        },
        error => {
          console.error('Error fetching admin data:', error);
        }
      );
    });
  }

  formatDate(date: Date): string {
    return date ? date.toISOString().substring(0, 10) : '';
  }

  updateAdmin(): void {
    this.service.updateAdmin(this.currentAdmin.id, this.currentAdmin)
      .subscribe(
        (res: any) => {
          this.document.documentElement.scrollTop = 0;
          this.successMessage = 'Admin modifié avec succès!';
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 2000);
        },
        (error: any) => {
          this.document.documentElement.scrollTop = 0;
          console.error('Error updating admin:', error);
          this.errorMessage = 'Il y a eu une erreur lors de la modification veuillez réessayer';
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 2000);
        }
      );
  }

}
