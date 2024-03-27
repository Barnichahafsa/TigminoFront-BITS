import { Component, Inject, Input, OnInit } from '@angular/core';
import { Depense } from "../../_models/Depense";
import { DepenseService } from "../../service/depense.service";
import { BlocDepense } from "../../_models/BlocDepense";
import { AdminRole, AdminWeb } from "../../_models/AdminWeb";
import { DOCUMENT } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";
import { ConfirmationDialogComponent } from "../../components/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {
  depenses: Depense[] = [];
  initialCheckedStates: { [id: number]: boolean } = {};
  @Input() currentDepense: Depense = new Depense();
  public showSuccessMessage!: boolean;
  public errorMessage!: string;
  public showErrorMessage!: boolean;
  public successMessage!: string;
  originalDepenses: Depense[] = [];
  searchText = '';
  selectedSearchCriteria = 'objectif';
  loggedInAdmin: AdminWeb | null = null;
  private id!: string;

  constructor(private authService: AuthService,
              @Inject(DOCUMENT) private document: Document,
              private depenseService: DepenseService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.loggedInAdmin = this.authService.getLoggedInAdmin();
    this.depenses.forEach(depense => {
      this.initialCheckedStates[depense.id] = depense.checked;
    });
    this.fetchDepenses();

    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id')!;
      this.depenseService.getDepenseById(this.id).subscribe(
        (depense: Depense) => {
          this.currentDepense = depense;
        },
        error => {
          console.error('Error fetching admin data:', error);
        }
      );
    }
  }


  fetchDepenses(): void {
    this.depenseService.getDepenses()
      .subscribe(
        (depenses: Depense[]) => {
          if (this.loggedInAdmin?.role !== AdminRole.SYNDIC) {
            this.depenses = depenses;
          } else {
            depenses.forEach(depense => {
              if (depense.blocDepenses[0]?.bloc.residence.syndic?.id === this.loggedInAdmin?.id) {
                this.depenses.push(depense);
              }
            });
          }
          this.originalDepenses = this.depenses;
          this.filterDepenses();
        },
        (error) => {
          console.log('Error fetching expenses:', error);
        });
  }


  filterByCriteria(depense: Depense): boolean {
    const searchTerm = this.searchText.toLowerCase().trim();
    const selectedField = this.selectedSearchCriteria;

    switch (selectedField) {
      case 'objectif':
        return depense.objectif.toLowerCase().includes(searchTerm);
      case 'description':
        return depense.description.toLowerCase().includes(searchTerm);
      case 'montantTotal':
        return depense.montantTotal.toString().includes(searchTerm);
      case 'bloc':
        return depense.blocDepenses.some((blocDepense: BlocDepense) =>
          blocDepense?.bloc?.nom?.toLowerCase().includes(searchTerm)
        );
      default:
        return false;
    }
  }

  onSearch(): void {
    this.filterDepenses();
  }

  filterDepenses(): void {
    if (!this.searchText) {
      this.depenses = [...this.originalDepenses];
      return;
    }

    this.depenses = this.originalDepenses.filter(depense => this.filterByCriteria(depense));
  }

  saveChanges(depense: Depense) {
    if (depense.checked !== this.initialCheckedStates[depense.id]) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { message: 'Êtes vous sûr(e) de vouloir valider cette dépense?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) { // result is true if "Oui" is clicked
          this.depenseService.updateDepenseChecked(depense.id, { checked: depense.checked })
            .subscribe(
              updatedDepense => {
                console.log('Depense updated successfully', updatedDepense);
              },
              error => {
                console.error('Error updating depense', error);
              }
            );
        }
      });
    }
  }


  goToCreatePage() {
    this.router.navigate(['/addDepense']);
  }
  getResidenceName(depense: Depense): string {
    return depense.blocDepenses.length > 0 ? depense.blocDepenses[0]?.bloc.residence?.nom : '';
  }

  protected readonly AdminRole = AdminRole;
}
