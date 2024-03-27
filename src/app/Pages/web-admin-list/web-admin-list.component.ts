import {Component, OnInit} from '@angular/core';
import {AdminWebService} from "../../service/web-admin.service";
import {AdminWeb} from "../../_models/AdminWeb";
import {Router} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-web-admin-list',
  templateUrl: './web-admin-list.component.html',
  styleUrls: ['./web-admin-list.component.css']
})
export class WebAdminListComponent implements OnInit {
  admins: AdminWeb[] = [];
  searchText = '';
  selectedSearchCriteria = 'nom';


  constructor(private service: AdminWebService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getWebAdmins();
  }

  getWebAdmins() {
    this.service.getAllAdmins().subscribe(
      (res: AdminWeb[]) => {
        this.admins = res;
      },
      error => {
        if (error.status === 404) {
          alert('Admins not found.');
        } else {
          alert(`Failed to get admins: ${error.message}`);
        }
      }
    );
  }


  deleteAdmin(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {message: 'Êtes vous sûr(e) de vouloir supprimer cet admin?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteAdmin(id).subscribe(() => {
          this.admins = this.admins.filter(admin => admin.id !== id);
        });
      }
    });
  }


  goToCreatePage() {
    this.router.navigate(['/register']);
  }


}
