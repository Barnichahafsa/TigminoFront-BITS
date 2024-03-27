import {Component} from '@angular/core';
import {ResidenceService} from "../../service/residence.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Residence} from "../../_models/Residence";

@Component({
  selector: 'app-residence-list',
  templateUrl: './residence-list.component.html',
  styleUrls: ['./residence-list.component.css']
})
export class ResidenceListComponent {
  residences: Residence[] = [];
  searchText = '';
  selectedSearchCriteria = 'nom';


  constructor(private service: ResidenceService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getResidences();
  }

  getResidences() {
    this.service.getAllResidences().subscribe(
      (res: Residence[]) => {
        this.residences = res;
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

}
