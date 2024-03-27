import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {MobUser} from "../../_models/MobUser";
import {MobUserService} from "../../service/mob-user.service";

@Component({
  selector: 'app-mob-user-list',
  templateUrl: './mob-user-list.component.html',
  styleUrls: ['./mob-user-list.component.css']
})
export class MobUserListComponent implements OnInit {
  users: MobUser[] = [];
  coprs: MobUser[] = [];
  searchText = '';
  selectedSearchCriteria = 'nom';


  constructor(private service: MobUserService,
              private router: Router,
              private dialog: MatDialog,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getResidentsWithApartmentsAndResidences();
  }

  getResidentsWithApartmentsAndResidences(): void {
    this.service.getAllUsersWithDetails().subscribe(
      (data: MobUser[]) => {
        console.log(data);
        this.users = data;
        this.filterCoproprietaires();
      },
      (error) => {
        console.log('Error fetching residents:', error);
      }
    );
  }

  filterCoproprietaires(): void {
    this.coprs = this.users.filter(user => user.type === 'COPROPRIETAIRE' && this.filterByCriteria(user));
  }

  filterByCriteria(user: MobUser): boolean {
    const searchTerm = this.searchText.toLowerCase().trim();
    const selectedField = this.selectedSearchCriteria;
    console.log('Search Term:', searchTerm);
    console.log('Residence Name:', user.appartement?.residence?.nom.toLowerCase());

    if (selectedField === 'nom') {
      return user.nom.toLowerCase().includes(searchTerm);
    } else if (selectedField === 'prenom') {
      return user.prenom.toLowerCase().includes(searchTerm);
    } else if (selectedField === 'tel') {
      return user.tel.includes(searchTerm);
    } else if (selectedField === 'residence') {
      return user.appartement.residence.nom.toLowerCase().includes(searchTerm);
    } else if (selectedField === 'appartement') {
      return user.appartement.number.toString().includes(searchTerm);
    } else if (selectedField === 'sexe') {
      return user.sexe.toLowerCase().includes(searchTerm);
    }

    return false;
  }


  onSearch(): void {
    this.filterCoproprietaires();
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {message: 'Êtes vous sûr(e) de vouloir supprimer cet utilisateur?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteUser(id).subscribe(() => {
          this.coprs = this.coprs.filter(user => user.id !== id);
        });
      }
    });
  }

  goToCreatePage() {
    this.router.navigate(['/addUser']);
  }

  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const dob = new Date(dateOfBirth);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }
}
