import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {MobUserService} from "../../service/mob-user.service";
import {MobUser} from "../../_models/MobUser";
import {ResidenceService} from "../../service/residence.service";
import {Residence} from "../../_models/Residence";
import {AppartementService} from "../../service/appartement.service";
import {Appartement} from "../../_models/Appartement";

@Component({
  selector: 'app-add-mob-user',
  templateUrl: './add-mob-user.component.html',
  styleUrls: ['./add-mob-user.component.css']
})
export class AddMobUserComponent implements OnInit {
  @ViewChild('userForm') userForm: any;
  showForm: boolean = false;

  appartement: Appartement = new Appartement();
  residences!: Residence[];
  apartments!: Appartement[];
  selectedResidenceId!: number;
  successMessage: string = '';
  errorMessage: string = '';
  public showSuccessMessage!: boolean;
  public showErrorMessage!: boolean;
  newUser: MobUser = new MobUser();

  constructor(@Inject(DOCUMENT) private document: Document,
              private mobUserService: MobUserService,
              private formBuilder: FormBuilder,
              private appartementService: AppartementService,
              private residenceService: ResidenceService) {
  }


  ngOnInit(): void {
    this.loadResidences();
  }

  loadResidences(): void {
    this.residenceService.getAllResidences()
      .subscribe(
        data => {
          this.residences = data;
        },
        error => {
          console.error('Error loading residences:', error);
        }
      );
  }

  loadApartments(): void {
    if (this.selectedResidenceId) {
      this.appartementService.getAppartementsByResidenceId(this.selectedResidenceId)
        .subscribe(
          data => {
            this.apartments = data;
          },
          error => {
            console.error('Error loading apartments:', error);
          }
        );
    }
  }

  onSubmit(): void {
    const selectedResidence = this.residences.find(residence => residence.id === this.selectedResidenceId);
    if (selectedResidence) {
      this.appartement.residence = selectedResidence;
    }

    this.appartementService.addAppartement(this.appartement, this.selectedResidenceId)
      .subscribe(
        response => {
          this.successMessage = 'Appartement créé avec succès';
          console.log(response);
          this.resetForm();
          this.showSuccessMessage = true;
          window.location.reload();
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 2000);
        },
        error => {
          this.document.documentElement.scrollTop = 0;
          this.errorMessage = 'Il y a eu une erreur lors de la création. Veuillez réessayer.';
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 2000);

        }
      );
  }

  addUserCop() {
    if (this.userForm.invalid || !this.appartement.id) {
      return;
    }

    this.mobUserService.addUser(this.newUser, this.appartement.id).subscribe(
      response => {
        this.document.documentElement.scrollTop = 0;
        this.successMessage = 'Copropriétaire créé avec succès';
        console.log(response);
        this.resetForm();
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 2000);
      },
      error => {
        this.document.documentElement.scrollTop = 0;
        this.errorMessage = 'Il y a eu une erreur lors de la création. Veuillez réessayer.';
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 2000);
      }
    );
  }


  resetForm() {
    this.newUser = new MobUser();
    this.userForm.resetForm();
  }
}
