import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AdminWeb} from "../../_models/AdminWeb";
import {AdminWebService} from "../../service/web-admin.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DOCUMENT} from "@angular/common";

function roleValidator(control: AbstractControl): { [key: string]: any } | null {
  const validRoles = ['SYNDIC', 'SUPERADMIN'];
  if (control.value && validRoles.indexOf(control.value.toUpperCase()) === -1) {
    return {'invalidRole': true};
  }
  return null;
}

function contactValidator(control: AbstractControl): { [key: string]: any } | null {
  const validPrefixes = ['05', '06', '07'];
  const value = control.value;
  if (value && !validPrefixes.some(prefix => value.startsWith(prefix))) {
    return {'invalidContact': true};
  }
  return null;
}

function blockAccessValidator(control: AbstractControl): { [key: string]: any } | null {
  const value = control.value;
  if (value !== '0' && value !== '1') {
    return {'invalidBlockAccess': true};
  }
  return null;
}

function dateRangeValidator(group: FormGroup): { [key: string]: any } | null {
  const startDateControl = group.get('date_start_passkey');
  const endDateControl = group.get('date_end_passkey');

  if (startDateControl && endDateControl && startDateControl.value && endDateControl.value) {
    const startDate = startDateControl.value;
    const endDate = endDateControl.value;

    if (startDate > endDate) {
      return {'invalidDateRange': true};
    }
  }

  return null;
}

@Component({
  selector: 'app-add-web-admin',
  templateUrl: './add-web-admin.component.html',
  styleUrls: ['./add-web-admin.component.css']
})

export class AddWebAdminComponent implements OnInit {
  newAdmin: AdminWeb = new AdminWeb();
  successMessage: string = '';
  errorMessage: string = '';
  @ViewChild('adminForm') adminForm: any;

  messagesErreur = {
    role: {
      required: 'Le rôle est requis.',
      invalidRole: 'Rôle invalide. Doit être "SYNDIC" ou "SUPERADMIN".'
    },
    contact: {
      required: 'Le contact est requis.',
      maxLength: 'Le contact ne doit pas dépasser 10 caractères.',
      invalidContact: 'Le contact doit commencer par "05", "06" ou "07".'
    },
    block_access: {
      required: 'L\'accès au bloc est requis.',
      invalidBlockAccess: 'L\'accès au bloc doit être "0" ou "1".'
    },
    date_start_passkey: {
      required: 'La date de début est requise.'
    },
    date_end_passkey: {
      required: 'La date de fin est requise.'
    },
    dateRange: {
      invalidDateRange: 'La date de début ne peut pas être postérieure à la date de fin.',
      invalidReverseDateRange: 'La date de fin ne peut pas être antérieure à la date de début.'
    }
  };
  public showSuccessMessage !: boolean;
  public showErrorMessage !: boolean;
  protected readonly contactValidator = contactValidator;

  constructor(@Inject(DOCUMENT) private document: Document, private webAdminService: AdminWebService, private formBuilder: FormBuilder) {
    this.adminForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', [Validators.required, roleValidator]],
      contact: ['', [Validators.required, Validators.maxLength(10), contactValidator]],
      block_access: ['', [Validators.required, blockAccessValidator]],
      date_start_passkey: ['', Validators.required],
      date_end_passkey: ['', Validators.required],
    }, {validator: dateRangeValidator});

  }

  register() {
    if (this.adminForm.invalid) {
      return;
    }

    this.webAdminService.register(this.newAdmin).subscribe(
      response => {
        this.document.documentElement.scrollTop = 0;
        this.successMessage = 'Admin créé avec succès';
        this.resetForm();
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 2000);
      },
      error => {
        this.document.documentElement.scrollTop = 0;
        console.error('Error creating admin:', error);
        this.errorMessage = 'Il y a eu une erreur lors de la création. Veuillez réessayer.';
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 2000);
      }
    );
  }

  ngOnInit(): void {
  }

  resetForm() {
    this.newAdmin = new AdminWeb();
    this.adminForm.resetForm();
  }
}
